import { Resolver, Query, Arg, Ctx, Mutation, UseMiddleware, Int } from 'type-graphql'
import { User } from '../../db/entities/User'
import { Prompt } from '../../db/entities/Prompt'
import { Favorite } from '../../db/entities/Favorite'
import type { ContextProps } from '@app/api/graphql/context'
import { isAuth } from '@app/middleware'

@Resolver()
export class FavoriteResolver {
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
  async myFavoritePrompts(@Ctx() { session }: ContextProps): Promise<Favorite[] | null> {
    if (!session || !session.userID) {
      console.log('Session or userID is undefined:', session)
      return null
    }

    const userId = session.userID
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

  @Mutation(() => Favorite)
  @UseMiddleware(isAuth)
  async addToFavorites(
    @Arg('promptId', () => Int) promptId: number,
    @Ctx() { session }: ContextProps
  ): Promise<Favorite> {
    const userId = session.userID
    const user = await User.findOne({ where: { id: userId } })
    const prompt = await Prompt.findOne({ where: { id: promptId } })

    if (!user || !prompt) {
      throw new Error('User or prompt not found')
    }

    const existingFavorite = await Favorite.findOne({
      where: { user: { id: userId }, prompt: { id: promptId } },
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

  @Mutation(() => Int) // Using Int if you only want to return the ID
  @UseMiddleware(isAuth)
  async removeFromFavorites(
    @Arg('favoriteID', () => Int) favoriteID: number,
  ): Promise<number> { // Change return type to number for the ID
    const existingFavorite = await Favorite.findOne({
      where: { id: favoriteID }
    })

    if (!existingFavorite) {
      throw new Error('Favorite not found')
    }

    const favoriteId = existingFavorite.id
    await Favorite.remove(existingFavorite)

    return favoriteId // Return only the ID
  }


  // @Mutation(() => Favorite)
  // @UseMiddleware(isAuth)
  // async removeFromFavorites(
  //   @Arg('favoriteId', () => Int) favoriteId: number
  // ): Promise<Favorite> {
  //   // Find the favorite by its unique ID
  //   const favorite = await Favorite.findOne({ where: { id: favoriteId } })

  //   if (!favorite) {
  //     throw new Error('Favorite not found')
  //   }

  //   // Remove the favorite entry
  //   await Favorite.remove(favorite)
  //   return favorite
  // }


  //   @Mutation(() => Favorite)
  //   @UseMiddleware(isAuth)
  //   async toggleFavorite(
  //     @Arg('promptId', () => Int) promptId: number,
  //     @Ctx() { session }: ContextProps
  //   ): Promise<Favorite> {
  //     const userId = session.userID
  //     const user = await User.findOne({ where: { id: userId } })
  //     const prompt = await Prompt.findOne({ where: { id: promptId } })

  //     if (!user || !prompt) {
  //       throw new Error('User or prompt not found')
  //     }

  //     // Check if the prompt is already favorited
  //     const existingFavorite = await Favorite.findOne({
  //       where: { user: { id: userId }, prompt: { id: promptId } },
  //     })

  //     if (existingFavorite) {
  //       // If it exists, remove it
  //        await Favorite.remove(existingFavorite)
  //       return existingFavorite // Return false when favorite is removed
  //     }

  //     const newFavorite = new Favorite()
  //     newFavorite.user = Promise.resolve(user)
  //     newFavorite.prompt = Promise.resolve(prompt)

  //     await newFavorite.save() // Save the favorite
  //     return newFavorite // Return true when favorite is added
  //   }
}
