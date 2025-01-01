import { MiddlewareFn } from "type-graphql"
import { AppDataSource, initializeDatabase } from "@app/api/db/typeorm.config"

export const DatabaseCheckMiddleware: MiddlewareFn = async ({ context }, next) => {
  if (!AppDataSource.isInitialized) {
    try {
      await initializeDatabase()
      console.log("Database initialized by middleware.")
    } catch (error) {
      console.error("Database initialization failed:", error)
      throw new Error("Failed to initialize the database")
    }
  }
  return next() // Continue to the resolver
}
