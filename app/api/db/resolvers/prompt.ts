import { isAuth } from "../../../middleware"
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware, } from "type-graphql"
import type { ContextProps } from "../../graphql/context"
import { BaseEntity } from "typeorm"
import { DatabaseCheckMiddleware } from "@app/api/graphql/middleware/databaseCheck"
import { initializeDatabase } from "../typeorm.config"
import { Prompt } from "../../db/entities/Prompt"
import { Favorite } from "../../db/entities/Favorite"
import { User } from "../../db/entities/User"


@InputType('PromptInput')
class PromptInput {
  @Field()
  title!: string

  @Field()
  prompt!: string

  @Field()
  tag!: string

  @Field(() => Int)
  likes!: number
}

@ObjectType('PaginatedPrompts')
class PaginatedPrompts {
  @Field(() => [Prompt])
  prompts!: Prompt[]

  @Field()
  hasMore!: boolean
}

@Resolver(Prompt)
export class PromptResolver extends BaseEntity {

  // Resolve the User related to Prompt
  @FieldResolver(() => User)
  async user(@Root() prompt: Prompt): Promise<User | null> {
    const { User } = require('../../db/entities/User')
    return await User.findOne({ where: { id: prompt.creatorId } }) // Resolve User lazily
  }

  @FieldResolver(() => [Favorite])
  async favorites(@Root() prompt: Prompt): Promise<Favorite[]> {
    const { Favorite } = require('../../db/entities/Favorite')
    return await Favorite.find({ where: { promptId: prompt.id } })
  }

  @Query(() => PaginatedPrompts, { nullable: true })
  @UseMiddleware(DatabaseCheckMiddleware)
  async prompts(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Ctx() { dataSource }: ContextProps
  ): Promise<PaginatedPrompts> {
    !dataSource && await initializeDatabase()

    const promptRepository = dataSource.getRepository(Prompt)

    const realLimit = Math.min(100, limit) //* take the smaller of two values
    const realLimitPlusOne = realLimit + 1

    const replacements: any[] = [realLimitPlusOne]

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)))
    }

    const queryBuilder = promptRepository.createQueryBuilder("p")
      .innerJoinAndSelect("p.creator", "u") // Assuming a relation exists between Post and User
      .orderBy("p.createdAt", "DESC")
      .take(realLimitPlusOne)


    if (cursor) {
      queryBuilder.andWhere("p.createdAt < :cursor", { cursor: new Date(parseInt(cursor, 10)) });
    }

    const prompts = await queryBuilder.getMany()

    let hasMore = false
    if (prompts.length === realLimitPlusOne) {
      hasMore = true
      prompts.pop()
    }

    return { prompts: prompts.slice(0, realLimit), hasMore }
  }

  @Query(() => Prompt, { nullable: true })
  @UseMiddleware(DatabaseCheckMiddleware)
  async getPromptById(
    @Arg('id', () => Int) id: number,
    @Ctx() { dataSource }: ContextProps
  ): Promise<Prompt | null> {
    const promptRepository = dataSource.getRepository(Prompt)
    return await promptRepository.findOne({
      where: { id }, // Find the prompt by its ID
    })
  }

  @Query(() => [Prompt], { nullable: true })
  @UseMiddleware(DatabaseCheckMiddleware)
  async getUserPrompts(@Ctx() { session, dataSource }: ContextProps) {
    return await dataSource.getRepository(Prompt).find({
      where: { creator: { id: session.userID } }, // Filter prompts by the creator's ID
      relations: ['creator'], // Include the related User (creator) in the result
    })
  }

  @Query(() => [Prompt], { nullable: true })
  @UseMiddleware(DatabaseCheckMiddleware)
  async getPromptsUserById(
    @Arg('id', () => Int) id: number,
    @Ctx() { dataSource }: ContextProps) {
    const ps = await dataSource.getRepository(Prompt).find({
      where: { creatorId: id }, // Filter prompts by the creator's ID
      relations: ['creator'], // Include the related User (creator) in the result
    })
    return ps
  }

  //? Mutations
  @Mutation(() => Prompt)
  @UseMiddleware(isAuth)
  @UseMiddleware(DatabaseCheckMiddleware)
  async createPrompt(
    @Arg('input') input: PromptInput,
    @Ctx() { session, dataSource }: ContextProps,
  ): Promise<Prompt> {
    if (!dataSource) {
      await initializeDatabase()
    }

    // Insert new prompt using Query Builder
    const insertResult = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Prompt)
      .values({
        ...input,
        creatorId: session.userID,
      })
      .execute()

    // Get the ID of the newly inserted prompt
    const newPromptId = insertResult.generatedMaps[0].id

    // Fetch the complete prompt using Query Builder
    const savedPrompt = await dataSource
      .createQueryBuilder(Prompt, 'prompt')
      .where('prompt.id = :id', { id: newPromptId })
      .getOne()

    if (!savedPrompt) {
      throw new Error('Failed to fetch the newly created prompt')
    }

    return savedPrompt
  }

  @Mutation(() => Prompt)
  @UseMiddleware(DatabaseCheckMiddleware)
  @UseMiddleware(isAuth)
  async updatePrompt(@Arg('id', () => Int) id: number, @Arg('input') input: PromptInput,
    @Ctx() { session, dataSource }: ContextProps):
    Promise<Prompt | null> {
    const result = await dataSource
      .createQueryBuilder()
      .update(Prompt)
      .set({ ...input })
      .where('id = :id and "creatorId" = :creatorId', { id, creatorId: session.userID })
      .returning('*')
      .execute()

    console.log("result: ", result)
    return result.raw[0]
  }

  @Mutation(() => Int)
  @UseMiddleware(DatabaseCheckMiddleware)
  async deletePrompt(
    @Arg('id', () => Int) id: number,
    @Ctx() { dataSource }: ContextProps
  ): Promise<number> {
    const promptRepository = dataSource.getRepository(Prompt)

    const result = await promptRepository
      .createQueryBuilder()
      .delete()
      .from(Prompt)
      .where("id = :id", { id })
      .execute()

    if (result.affected === 0) {
      throw new Error('Prompt not found')
    }

    return id
  }

  @Mutation(() => Boolean)
  @UseMiddleware(DatabaseCheckMiddleware)
  async updateLikes(
    @Arg('id', () => Int) id: number,
    @Ctx() { dataSource }: ContextProps
  ): Promise<boolean> {
    const result = await dataSource
      .createQueryBuilder()
      .update(Prompt)
      .set({ likes: () => '"likes" + 1' }) // Increment the likes field
      .where('id = :id', { id })
      .execute()

    return result.affected === 1 // Return true if a row was updated
  }

}

