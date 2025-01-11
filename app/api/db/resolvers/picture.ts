import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { GraphQLUpload, type File } from 'graphql-upload-nextjs'
import { Picture } from '../../db/entities/Picture'
import { v4 as uuidv4 } from 'uuid'
import fs, { createWriteStream } from 'fs'
import path from 'path'
import type { ContextProps } from '@app/api/graphql/context'
import { User } from '../../db//entities/User'
import { pipeline } from 'stream'
import { DatabaseCheckMiddleware } from '@app/api/graphql/middleware/databaseCheck'

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
      const { createReadStream, encoding, fileName, fileSize, mimeType } = await file
      const uniqueFilename = `${uuidv4()}-${fileName}`
      // Use a Promise to handle the asynchronous file saving operation.
      new Promise((resolve, reject) => {
        pipeline(
          createReadStream(),
          // This example stores the file in the 'public' directory for simplicity, you should NEVER do this.
          createWriteStream(`./public/uploads/${uniqueFilename}`),
          (error) => {
            if (error) {
              console.error('File upload pipeline error:', error)
              reject(new Error('Error during file upload.'))
            } else {
              // console.log(`${ip} successfully uploaded ${fileName}`)
              // Resolve the promise with the file details for the GraphQL response.
              resolve({ encoding, fileName, fileSize, mimeType, uri: `http://localhost:3000/${uniqueFilename}` })
            }
          }
        )
      })

      // Get the user and save the picture with user reference
      const user = await User.findOne({ where: { id: session.userID } })
      if (!user) throw new Error('User not found')

      const picture = new Picture()
      picture.filename = uniqueFilename
      picture.mimetype = mimeType
      picture.path = `/uploads/${uniqueFilename}`
      picture.creatorId = session.userID

      await picture.save()
      return true
    } catch (error) {
      // You should handle any errors that occur during file upload more gracefully.
      console.error('Error handling file upload:', error)
      throw new Error('Failed to handle file upload.')
    }
  }


  @Mutation(() => Boolean)
  async deletePicture(@Arg('id', () => Int) id: number): Promise<boolean> {
    const picture = await Picture.findOne({ where: { id } })
    if (!picture) {
      throw new Error('Picture not found')
    }

    //* Delete the file from the filesystem
    const filePath = path.join(__dirname, `../../uploads/${picture.filename}`)
    fs.unlinkSync(filePath)

    //* Delete from the database
    await Picture.remove(picture)
    return true
  }

  // Fetch all pictures (to display)
  // @Query(() => [Picture])
  // async getAllPictures() {
  //   return await Picture.find()
  // }

}
