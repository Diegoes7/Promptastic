import { Resolver, Query, Arg, Ctx, Mutation, UseMiddleware, Int, FieldResolver, Root } from 'type-graphql'
import { User } from '../../db/entities/User'
import { Prompt } from '../../db/entities/Prompt'
import { Favorite } from '../../db/entities/Favorite'
import type { ContextProps } from '@app/api/graphql/context'
import { isAuth } from '@app/middleware'

@Resolver(() => Favorite)
export class FavoriteResolver {

  // Field resolver to fetch the User of a Favorite
  // @FieldResolver(() => User)
  // async user(@Root() favorite: Favorite): Promise<User | null> {
  //   const { User } = require('../../db/entities/User')
  //   return await User.findOne({ where: { id: favorite.userId } }) // Resolve the user related to Favorite lazily
  // }

  @FieldResolver(() => Prompt)
  async prompt(@Root() favorite: Favorite): Promise<Prompt | null> {
    const { Prompt } = require('../../db/entities/Prompt')
    return await Prompt.findOne({ where: { id: favorite.promptId } })
  }

  @Query(() => [Favorite])
  async getUserFavoritePrompts(@Arg('userId', () => Int) userId: number): Promise<Favorite[] | null> {

    const favoritePrompts = await Favorite.createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.prompt', 'prompt')
      .where('favorite.userId = :userId', { userId })
      .getMany()

    if (!favoritePrompts) {
      throw new Error('User not found')
    }

    return favoritePrompts
  }

  @Query(() => [Favorite])
  async myFavoritePrompts(@Ctx() { session }: ContextProps
  ): Promise<Favorite[]> {
    if (!session || !session.userID) {
      console.log('Session or userID is undefined:', session)
      return []
    }

    const userId = session.userID
    // Use QueryBuilder to carefully select required fields
    const favoritePrompts = await Favorite.createQueryBuilder('favorite')
      .innerJoinAndSelect('favorite.prompt', 'prompt')
      .where('favorite.userId = :userId', { userId })
      .getMany()

    return favoritePrompts ?? []
  }

  @Mutation(() => Favorite)
  @UseMiddleware(isAuth)
  async addToFavorites(
    @Arg('promptId', () => Int) promptId: number,
    @Ctx() { session }: ContextProps
  ): Promise<Favorite> {
    const userId = session.userID

    // Validate user and prompt exist
    const user = await User.findOneBy({ id: userId })
    const prompt = await Prompt.findOneBy({ id: promptId })

    if (!user || !prompt) {
      throw new Error('User or prompt not found')
    }

    // Check if this user already favorited the prompt
    const existingFavorite = await Favorite.findOne({
      where: {
        userId: userId,    // Check the user ID
        promptId: promptId // Check the prompt ID
      }
    })

    if (existingFavorite) {
      throw new Error('This prompt is already in your favorites')
    }

    // Create and save new favorite
    const newFavorite = new Favorite()
    newFavorite.userId = userId
    newFavorite.promptId = promptId
    await newFavorite.save()

    return newFavorite
  }


  @Mutation(() => Int)
  @UseMiddleware(isAuth)
  async removeFromFavorites(
    @Arg('promptId', () => Int) promptId: number,
  ): Promise<number> {
    const existingFavorite = await Favorite.findOne({
      where: { promptId: promptId }
    })

    if (!existingFavorite) {
      throw new Error('Favorite not found')
    }

    const favoriteId = existingFavorite.id
    await Favorite.remove(existingFavorite)

    return favoriteId // Return only the ID
  }

}
