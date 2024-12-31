// middleware.ts (root of your project)
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { AppDataSource, initializeDatabase } from './api/db/typeorm.config'
import { MiddlewareFn } from 'type-graphql'
import { ContextProps } from './api/graphql/context'

export const isAuth: MiddlewareFn<ContextProps> = ({ context }, next) => {
  if (!context.session.userID) {
    throw new Error('Not authenticated')
  }
  return next()
}


// export async function middleware(req: NextRequest) {
//   try {
//     const dataSource = AppDataSource // Ensure database is ready
//     if (!dataSource.isInitialized) {
//       await initializeDatabase() // Initialize the database if not already done
//     }
//   } catch (error) {
//     console.error("Database initialization failed", error)
//     return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 })
//   }

//   console.log('Middleware Database Init', req) // Debug logging
//   return NextResponse.next() // Continue to the next step in the pipeline
// }

// // Optionally, specify the paths this middleware should apply to
// export const config = {
//   matcher: ['/api/:path*'], // Apply to all API routes
// }


