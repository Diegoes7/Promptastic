import { NextApiRequest, NextApiResponse } from 'next'
import { AppDataSource } from '../db/typeorm.config'
import { supabase } from '../db/supabase_client'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'

export type ContextProps = {
  req: NextApiRequest
  res: NextApiResponse
  dataSource: typeof AppDataSource
  supabaseClient: typeof supabase
  session: any
}

// const createContext = async ({ req, res }: { req: NextApiRequest; res: NextApiResponse }): Promise<ContextProps> => {
//   if (!AppDataSource.isInitialized) {
//     await AppDataSource.initialize();
//   }

//   const session = await getServerSession(req, res, authOptions);

//   console.log('Context session:', session); // Add this line to debug

//   return {
//     req,
//     res,
//     dataSource: AppDataSource,
//     supabaseClient: supabase,
//     session,
//   };
// };

// export default createContext;

