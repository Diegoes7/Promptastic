import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql"
import { User } from "../entities/User"
import type { ContextProps } from "../../graphql/context"
import argon2 from 'argon2'

import { BaseEntity } from "typeorm"
import { GraphQLUpload, type File } from 'graphql-upload-nextjs'
import fs from 'fs'
import path from 'path'
import { DatabaseCheckMiddleware } from "@app/api/graphql/middleware/databaseCheck"

@InputType()
export class UserInput {
  @Field()
  email!: string

  @Field()
  username!: string

  @Field()
  password!: string

  @Field({ nullable: true })
  picture?: string
}


@Resolver(User)
export class UserResolver extends BaseEntity {

  @Query(() => User, { nullable: true })
  user(@Ctx() { session }: ContextProps) {

    if (!session || !session.userID) {
      console.log('Session or userID is undefined:', session)
      return null
    }

    console.log('User ID', session.userID)
    return User.findOne({ where: { id: session.userID } })
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(DatabaseCheckMiddleware)
  async getOtherUser(@Arg('id', () => Int) id: number, @Ctx() { dataSource }: ContextProps): Promise<User | null> {
    const user = await dataSource.getRepository(User).findOne({ where: { id } })
    return user || null // Return null if the user is not found
  }

  //$ Mutations
  @Mutation(() => User)
  async register(
    @Arg('options') options: UserInput,
    @Ctx() { dataSource }: ContextProps): Promise<User> {
    const { email, password, username, picture } = options

    // let pictureUrl = ''
    // if (picture) {
    //   const { createReadStream, filename, mimetype } = picture
    //   // Define the path where files are stored
    //   const uploadPath = path.join(process.cwd(), 'public/uploads', filename)


    //   // Save the file to the upload path
    //   await new Promise<void>((resolve, reject) => {
    //     createReadStream()
    //       .pipe(fs.createWriteStream(uploadPath))
    //       .on('finish', () => resolve())
    //       .on('error', reject)
    //   })

    //   // Construct the URL
    //   pictureUrl = `https://${process.env.NEXTAUTH_URL_INTERNAL}/uploads/${filename}`
    // }

    const userRepository = dataSource.getRepository(User)
    const hashedPassword = await argon2.hash(password)

    const newUser = userRepository.create({
      username,
      email,
      picture,
      password: hashedPassword,
    })
    console.log(newUser)
    await userRepository.save(newUser)

    return newUser
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('id', () => Int) id: number,
    @Arg('username', () => String) username: string,
    @Ctx() { dataSource }: ContextProps,
    // @Arg('picture', () => GraphQLUpload, { nullable: true }) picture: FileUpload,
  ): Promise<User | null> {
    const userRepository = dataSource.getRepository(User)

    // let pictureUrl: string | undefined

    // if (picture) {
    //   const { createReadStream, filename } = await picture
    //   // Define the path where files are stored
    //   const uploadPath = path.join(process.cwd(), 'public/uploads', filename)

    //   // Save the file to the upload path
    //   await new Promise<void>((resolve, reject) => {
    //     createReadStream()
    //       .pipe(fs.createWriteStream(uploadPath))
    //       .on('finish', () => resolve())
    //       .on('error', reject)
    //   })

    //   // Construct the URL
    //   pictureUrl = `https://${process.env.NEXTAUTH_URL_INTERNAL}/uploads/${filename}`
    // }

    await userRepository.update(id, { username })

    const updatedUser = await userRepository.findOneBy({ id })
    return updatedUser
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => Int) id: number, @Ctx() { dataSource }: ContextProps): Promise<boolean> {
    const userRepository = dataSource.getRepository(User)

    const deleteResult = await userRepository.delete(id)
    return deleteResult.affected !== 0
  }

  @Mutation(() => User)
  async login(@Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { session, dataSource }: ContextProps
  ): Promise<User | string> {
    const user = await dataSource.getRepository(User).findOne({ where: { email } })
    console.log('Log in: ', user)

    if (!user) {
      return "That user does not exists!"
    }

    const valid = await argon2.verify(user.password as any, password)

    if (!valid) {
      return 'Incorrect password!'
    }

    return user
  }

  //get all the  users prompts
  // where: { creator: { id: session.userID || null } }, // Filter prompts by the creator's ID

  // @Query(() => [User])
  // async users(@Ctx() ctx: ContextProps): Promise<User[]> {
  //   return ctx.dataSource.getRepository(User).find();
  // }
}