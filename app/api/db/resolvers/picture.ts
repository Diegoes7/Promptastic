import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { GraphQLUpload, type File } from 'graphql-upload-nextjs'
import { Picture } from '../../db/entities/Picture'
import { v4 as uuidv4 } from 'uuid'
import type { ContextProps } from '@app/api/graphql/context'
import { User } from '../../db//entities/User'
import { DatabaseCheckMiddleware } from '@app/api/graphql/middleware/databaseCheck'
import { supabase } from '../supabase_client'

@Resolver(Picture)
export class PictureResolver {

  // Field resolver to fetch the User of a Favorite
  @FieldResolver(() => User)
  async user(@Root() picture: Picture): Promise<User | null> {
    return await User.findOne({ where: { id: picture.creatorId } }) // Resolve the user related to Favorite lazily
  }

  @Query(() => Picture, { nullable: true })
  @UseMiddleware(DatabaseCheckMiddleware)
  async getUserPicture(@Arg('creatorId', () => Int) creatorId: number,
  ): Promise<Picture | undefined | null> {
    const picture = await Picture.findOne({ where: { creatorId } })
    const found = picture ? picture : undefined
    return found
  }

  @Mutation(() => Boolean)
  async uploadPicture(
    @Arg('file', () => GraphQLUpload) file: Promise<File>,
    @Ctx() { session }: ContextProps
  ): Promise<boolean> {
    if (!session || !session.userID) {
      throw new Error("User not authenticated")
    }

    try {
      const { createReadStream, fileName, mimeType } = await file
      const uniqueFilename = `private/${uuidv4()}-${fileName}`

      // Convert stream to buffer
      const chunks: Uint8Array[] = []
      const stream = createReadStream()

      await new Promise<void>((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(chunk))
        stream.on('end', resolve)
        stream.on('error', reject)
      })

      const buffer = Buffer.concat(chunks)

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(uniqueFilename, buffer, { contentType: mimeType })

      if (error) {
        console.error("Supabase upload failed:", error)
        throw new Error(`Supabase upload failed: ${error.message}`)
      }

      // Get public URL of uploaded file
      const { data: publicUrlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(uniqueFilename)

      const publicUrl = publicUrlData.publicUrl

      // Save file metadata in database
      const user = await User.findOne({ where: { id: session.userID } })
      if (!user) throw new Error('User not found')

      const picture = new Picture()
      picture.filename = uniqueFilename
      picture.mimetype = mimeType
      picture.path = publicUrl // Store public URL instead of a temp path
      picture.creatorId = session.userID

      await picture.save()
      return true
    } catch (error) {
      console.error('Error handling file upload:', error)
      throw new Error('Failed to handle file upload.')
    }
  }


  @Mutation(() => Boolean)
  async deletePicture(
    @Arg('id', () => Int) id: number,
    @Ctx() { session }: ContextProps
  ): Promise<boolean> {
    if (!session || !session.userID) {
      throw new Error("User not authenticated")
    }

    // Find the picture in the database
    const picture = await Picture.findOne({ where: { id, creatorId: session.userID } })

    if (!picture) {
      throw new Error("Picture not found or you don't have permission to delete it")
    }

    // Delete from Supabase Storage
    const { error } = await supabase.storage.from('uploads').remove([picture.filename])

    if (error) {
      console.error("Supabase delete failed:", error)
      throw new Error(`Failed to delete from storage: ${error.message}`)
    }

    // Remove from database
    await Picture.delete({ id })

    return true
  }

}
