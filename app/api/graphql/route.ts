import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { schema } from './schema' // Assuming you have a GraphQL schema defined
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { AppDataSource, initializeDatabase } from '../db/typeorm.config'
import { ContextProps } from './context'
import { supabase } from '../db/supabase_client'
import { NextApiRequest, NextApiResponse } from 'next'
import { DataSource } from 'typeorm'
import { NextRequest } from 'next/server'
import { uploadProcess } from 'graphql-upload-nextjs'

// Disable Next.js body parsing for this route to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}

const server = new ApolloServer({
  schema,
  csrfPrevention: false,
})

let dataSource: DataSource

if (!AppDataSource.isInitialized) {
  dataSource = await initializeDatabase() as DataSource
}

const handleContext = async (req: NextApiRequest, res: NextApiResponse): Promise<ContextProps> => {

  const session = await getServerSession(authOptions)
  return { req, res, session, dataSource, supabaseClient: supabase }
}

// Use Apollo's Next.js handler with context
const handleServer = startServerAndCreateNextHandler(server, {
  context: handleContext,
})

const requestHandler = async (req: NextRequest, res: NextApiRequest) => {
  console.log('Incoming Request: ', req.body)
  try {
    // Handle file uploads specifically if the request is multipart/form-data.
    if (req.headers.get('content-type')?.includes('multipart/form-data')) {
      return await uploadProcess(
        req,
        handleContext(req as any, res as any),
        server,
        {
          // Allow only certain MIME types
          allowedTypes: ['image/jpeg', 'image/png', 'text/plain'],
          // Only allow image uploads up to 10MB.
          maxFileSize: 10 * 1024 * 1024
        }
      )
    } else {
      return await handleServer(req as any, res as any)
    }
    // Handle all other requests with the Apollo Server.
  } catch (error) {
    // In a production environment, errors should be handled more gracefully.
    console.error('Error in request handling:', error)
    throw new Error('Failed to process request.')
  }
}

export { requestHandler as GET, requestHandler as POST }
// Export request handlers for GET, POST, and OPTIONS methods.
// export const GET = requestHandler
// export const POST = requestHandler
// export const OPTIONS = requestHandler