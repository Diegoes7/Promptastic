import NextAuth from 'next-auth'
import { authOptions } from '../authOptions'


const handler = NextAuth(authOptions)
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await initializeDatabase()
//   return NextAuth(req, res, authOptions)
// }

export { handler as GET, handler as POST };


