export const runtime = "nodejs"

import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { schema } from './schema' // Assuming you have a GraphQL schema defined
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/authOptions'
import { AppDataSource, initializeDatabase } from '../db/typeorm.config'
import { ContextProps } from './context'
import { supabase } from '../db/supabase_client'
import { NextRequest, NextResponse } from 'next/server'
import { uploadProcess } from 'graphql-upload-nextjs'
import { DataSource } from 'typeorm'
import Cors from 'cors'


// Apollo Server setup
const server = new ApolloServer({
  schema,
  csrfPrevention: false,
})

const handleContext = async (req: NextRequest): Promise<ContextProps> => {
  const session = await getServerSession(authOptions)
  // Ensure the data source is initialized
  const dataSource = AppDataSource.isInitialized
    ? AppDataSource
    : await initializeDatabase()

  return { req, session, dataSource, supabaseClient: supabase }
}

// Create CORS middleware configuration
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: '*', // You can customize this to allow only specific domains
})

// Use Apollo's Next.js handler with context
const handleServer = startServerAndCreateNextHandler(server, {
  context: handleContext,
})

// CORS wrapper to handle Next.js requests
const runCorsMiddleware = (req: NextRequest, res: NextResponse) => {
  return new Promise<void>((resolve, reject) => {
    const resAdapter = {
      statusCode: res.status || 200,
      setHeader: (key: string, value: string) => {
        res.headers.set(key, value)
      },
      end: () => {
        resolve()
      },
    }

    cors(req as any, resAdapter as any, (result: any) => {
      if (result instanceof Error) {
        reject(result)
      } else {
        resolve()
      }
    })
  })
}


// Updated request handler to ensure correct return type
const requestHandler = async (req: NextRequest): Promise<NextResponse> => {
  // console.log('Incoming Request:', req.body)
  console.log("Request Headers", req.headers)
  console.log('Request Method:', req.method)

  console.log("Vercel URL", process.env.NEXT_PUBLIC_VERCEL_URL)
  try {
    // Run CORS middleware
    const res = new NextResponse()
    await runCorsMiddleware(req, res)

    // Handle file uploads specifically if the request is multipart/form-data.
    if (req.headers.get('content-type')?.includes('multipart/form-data')) {
      const response = await uploadProcess(
        req,
        handleContext(req),
        server,
        {
          // Allow only certain MIME types
          allowedTypes: ['image/jpeg', 'image/png', 'text/plain'],
          // Only allow image uploads up to 10MB.
          maxFileSize: 10 * 1024 * 1024
        }
      )
      // Handle the case when the response is undefined
      if (!response) {
        return new NextResponse(
          JSON.stringify({ error: 'Failed to process file upload' }),
          { status: 400 }
        )
      }

      return response // Return the response from uploadProcess
    } else {
      // Handle all other requests with Apollo Server.
      const serverResponse = await handleServer(req)

      // Convert generic Response to NextResponse
      if (serverResponse instanceof Response) {
        return new NextResponse(serverResponse.body, {
          headers: serverResponse.headers,
          status: serverResponse.status,
        })
      }

      return serverResponse // Ensure NextResponse is returned
    }
  } catch (error) {
    // Gracefully handle errors in production.
    console.error('Error in request handling:', error)
    return new NextResponse('Failed to process request', { status: 500 })
  }
}

export { requestHandler as GET, requestHandler as POST }
// Export handlers for GET, POST
// export const GET = requestHandler
// export const POST = requestHandler




// import { startServerAndCreateNextHandler } from '@as-integrations/next'
// import { ApolloServer } from '@apollo/server'
// import { schema } from './schema' // Assuming you have a GraphQL schema defined
// import { getServerSession } from 'next-auth'
// import { authOptions } from '../auth/authOptions'
// import { AppDataSource, initializeDatabase } from '../db/typeorm.config'
// import { ContextProps } from './context'
// import { supabase } from '../db/supabase_client'
// import { NextApiRequest, NextApiResponse } from 'next'
// import { DataSource } from 'typeorm'
// import { NextRequest } from 'next/server'
// import { uploadProcess } from 'graphql-upload-nextjs'

// // Disable Next.js body parsing for this route to handle file uploads
// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // }

// const server = new ApolloServer({
//   schema,
//   csrfPrevention: false,
// })

// let dataSource: DataSource

// if (!AppDataSource.isInitialized) {
//   dataSource = await initializeDatabase() as DataSource
// }

// const handleContext = async (req: NextApiRequest, res: NextApiResponse): Promise<ContextProps> => {

//   const session = await getServerSession(authOptions)
//   return { req, res, session, dataSource, supabaseClient: supabase }
// }

// // Use Apollo's Next.js handler with context
// const handleServer = startServerAndCreateNextHandler(server, {
//   context: handleContext,
// })

// const requestHandler = async (req: NextRequest, res: NextApiRequest) => {
//   console.log('Incoming Request: ', req.body)
//   try {
//     // Handle file uploads specifically if the request is multipart/form-data.
//     if (req.headers.get('content-type')?.includes('multipart/form-data')) {
//       return await uploadProcess(
//         req,
//         handleContext(req as any, res as any),
//         server,
//         {
//           // Allow only certain MIME types
//           allowedTypes: ['image/jpeg', 'image/png', 'text/plain'],
//           // Only allow image uploads up to 10MB.
//           maxFileSize: 10 * 1024 * 1024
//         }
//       )
//     } else {
//       return await handleServer(req as any, res as any)
//     }
//     // Handle all other requests with the Apollo Server.
//   } catch (error) {
//     // In a production environment, errors should be handled more gracefully.
//     console.error('Error in request handling:', error)
//     throw new Error('Failed to process request.')
//   }
// }

// export { requestHandler as GET, requestHandler as POST }
// // Export request handlers for GET, POST, and OPTIONS methods.
// // export const GET = requestHandler
// // export const POST = requestHandler
// // export const OPTIONS = requestHandler