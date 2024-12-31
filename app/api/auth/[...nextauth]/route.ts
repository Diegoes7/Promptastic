import NextAuth from 'next-auth'
import { authOptions } from '../authOptions'
import { initializeDatabase } from '@app/api/db/typeorm.config'


await initializeDatabase()

const handler = NextAuth(authOptions)
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await initializeDatabase()
//   return NextAuth(req, res, authOptions)
// }

export { handler as GET, handler as POST };


