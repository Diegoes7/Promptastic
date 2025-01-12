import { Resolver, Query, Arg, Ctx, Mutation, UseMiddleware, Int, FieldResolver, Root } from 'type-graphql'
import { User } from '../../db/entities/User'
import { Prompt } from '../../db/entities/Prompt'
import { Favorite } from '../../db/entities/Favorite'
import type { ContextProps } from '@app/api/graphql/context'
import { isAuth } from '@app/middleware'

@Resolver(() => Favorite)
export class FavoriteResolver {

   // Field resolver to fetch the User of a Favorite
   @FieldResolver(() => User)
   async user(@Root() favorite: Favorite): Promise<User | null> {
     return await User.findOne({ where: { id: favorite.userId } }); // Resolve the user related to Favorite lazily
   }

  @FieldResolver(() => Prompt)
  async prompt(@Root() favorite: Favorite): Promise<Prompt | null> {
    return await Prompt.findOne({ where: { id: favorite.promptId } })
  }

  @Query(() => [Favorite])
  async getUserFavoritePrompts(@Arg('userId', () => Int) userId: number): Promise<Favorite[] | null> {
    const user = await User.findOne({
      where: { id: userId },
      relations: ['favorites', 'favorites.prompt', 'favorites.prompt.creator'],
    })

    if (!user) {
      throw new Error('User not found')
    }

    const favoritePrompts = await Promise.all(
      (await user.favorites).map(async (favorite: Favorite) => await favorite)
    )

    return favoritePrompts
  }

  @Query(() => [Favorite])
  async myFavoritePrompts(@Ctx() { session }: ContextProps
  ): Promise<Favorite[] | null> {
    if (!session || !session.userID) {
      console.log('Session or userID is undefined:', session)
      return null
    }

    const userId = session.userID
    // Use QueryBuilder to carefully select required fields
    const favoritePrompts = await Favorite.createQueryBuilder('favorite')
      .innerJoinAndSelect('favorite.prompt', 'prompt')
      .innerJoinAndSelect('prompt.creator', 'creator')
      .where('favorite.userId = :userId', { userId })
      .getMany()

    return favoritePrompts
  }

  @Mutation(() => Favorite)
  @UseMiddleware(isAuth)
  async addToFavorites(
    @Arg('promptId', () => Int) promptId: number,
    @Ctx() { session }: ContextProps
  ): Promise<Favorite> {
    const userId = session.userID

    //* Fetch the user and prompt
    const user = await User.findOne({ where: { id: userId } })
    const prompt = await Prompt.findOne({ where: { id: promptId } })

    if (!user || !prompt) {
      throw new Error('User or prompt not found')
    }

    const existingFavorite = await Favorite.findOne({
      where: {
        user: { id: userId },
        prompt: { id: promptId }
      },
    })

    if (existingFavorite) {
      throw new Error('Already added to favorites')
    }

    const newFavorite = new Favorite()
    newFavorite.user = Promise.resolve(user)
    newFavorite.prompt = Promise.resolve(prompt)
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
