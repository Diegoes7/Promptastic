import 'reflect-metadata' // Import this to enable TypeORM decorators
import { DataSource } from 'typeorm'
import { User } from '../db/entities/User'
import { Prompt } from '../db/entities/Prompt'
import { Favorite } from '../db/entities/Favorite'
import { Picture } from '../db/entities/Picture'


export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // host: process.env.DB_HOST,
  // port: parseInt(process.env.DB_PORT?.replace(/^https:\/\//, '') || ''),
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  entities: [Favorite, User, Prompt, Picture],
  // relationLoadStrategy: "query", // Ensures relations are lazy-loaded with queries
  // synchronize: process.env.NODE_ENV === "development",
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  // migrations: ['./migrations/*.sql'],
  subscribers: [],
})


export const initializeDatabase = async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!')
      })
      .catch((err) => {
        console.error('Error during Data Source initialization:', err)
        throw err // Re-throw the error to propagate initialization failure
      })
  }
  return AppDataSource
};

