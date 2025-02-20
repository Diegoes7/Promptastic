import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql"
import { User } from "../../db/entities/User"
import type { ContextProps } from "../../graphql/context"
import bcrypt from 'bcrypt'
import { BaseEntity } from "typeorm"
import { DatabaseCheckMiddleware } from "@app/api/graphql/middleware/databaseCheck"
import { Favorite } from "../../db/entities/Favorite"
import { Prompt } from "../../db/entities/Prompt"

@InputType('UserInput')
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

  @FieldResolver(() => [Favorite])
  async favorites(@Root() user: User): Promise<Favorite[]> {
    const { Favorite } = require('../../db/entities/Favorite')
    return await Favorite.find({ where: { userId: user.id } })
  }

  @FieldResolver(() => [Prompt])
  async prompts(@Root() user: User): Promise<Prompt[]> {
    const { Prompt } = require('../../db/entities/Prompt')
    return await Prompt.find({ where: { id: user.promptId } })
  }

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
    return user || null //? Return null if the user is not found
  }

  //$ Mutations
  @Mutation(() => User)
  @UseMiddleware(DatabaseCheckMiddleware)
  async register(
    @Arg('options') options: UserInput,
    @Ctx() { dataSource }: ContextProps): Promise<User> {
    const { email, password, username, picture } = options

    const userRepository = dataSource.getRepository(User)
    const hashedPassword = await bcrypt.hash(password, 10) //* 10 is the number of salt rounds


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
  ): Promise<User | null> {
    const userRepository = dataSource.getRepository(User)

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
    @Ctx() { dataSource }: ContextProps
  ): Promise<User | string> {
    const user = await dataSource.getRepository(User).findOne({ where: { email } })
    console.log('Log in: ', user)

    if (!user) {
      return "That user does not exists!"
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
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