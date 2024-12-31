//app/api/graphql/schema.ts
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { UserResolver } from '../db/resolvers/user'
import { PromptResolver } from '../db/resolvers/prompt'
import { FavoriteResolver } from '../db/resolvers/favorite'
import { PictureResolver } from '../db/resolvers/picture'
import { DatabaseCheckMiddleware } from './middleware/databaseCheck'

export const schema = await buildSchema({
  resolvers: [UserResolver, PromptResolver, FavoriteResolver, PictureResolver],
  globalMiddlewares: [DatabaseCheckMiddleware], // Apply globally
  validate: false,
})

