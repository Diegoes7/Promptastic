import { AuthOptions, Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AppDataSource, initializeDatabase } from '../db/typeorm.config'
import { User } from '../db/entities/User'
import argon2 from 'argon2'
import { AdapterUser } from 'next-auth/adapters'
import { TypeORMAdapter } from "@auth/typeorm-adapter"
import { Picture } from '@app/api/db/entities/Picture'

interface NextAuthUser {
  id: string
  email: string
  username: string
  picture: string
}

interface ProfileProps {
  email?: string
  email_verified?: boolean
  sub?: string
  name?: string
  picture?: string
}

interface CredentialsPops {
  email?: string
  password?: string
}

export type MyOwnSession = Session & { userID?: string, createdAt?: Date }

export const authOptions: AuthOptions = {
  adapter: TypeORMAdapter(process.env.AUTH_TYPEORM_CONNECTION!),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<NextAuthUser | null> {
        if (!credentials) {
          throw new Error('No credentials provided')
        }

        await initializeDatabase()

        const userRepository = AppDataSource.getRepository(User)

        //* Find the user by email
        const user = await userRepository.findOne({ where: { email: credentials.email } })

        if (!user) {
          throw new Error('No user found with the provided email')
        }

        //$ Compare the provided password with the stored hash
        const isValidPassword = await argon2.verify(user.password, credentials!.password)

        if (!isValidPassword) {
          throw new Error('Invalid password')
        }

        // Return user object with the required properties
        const nextAuthUser: NextAuthUser = {
          id: user.id.toString(), // Convert number to string
          email: user.email,
          username: user.username,
          picture: user?.picture || '',
        }

        return nextAuthUser ? nextAuthUser : null
      }
    }),
  ],
  callbacks: {
    async session({ session, token, user }: { session: MyOwnSession, token: any, user: AdapterUser }) {

      await initializeDatabase()

      const userRepository = AppDataSource.getRepository(User)
      const sessionUser = await userRepository.findOne({
        where: { email: token.email },
      })
      console.log('Session User: ', sessionUser)

      //? Update the session object with additional user details
      if (sessionUser) {
        session.userID = sessionUser.id.toString()
        session.createdAt = sessionUser.createdAt
        session.user = {
          ...session.user,
          // id: sessionUser.id,
          image: sessionUser.picture,
          name: sessionUser.username,
          email: sessionUser.email,
        }
      }

      return session
    },
    async signIn({ profile, credentials }: { profile?: ProfileProps, credentials?: CredentialsPops }): Promise<string | boolean> {
      console.log('Profile:', profile)

      await initializeDatabase()

      const userRepository = AppDataSource.getRepository(User)
      const pictureRepository = AppDataSource.getRepository(Picture)

      // Handling sign-in with social accounts
      if (profile?.email && profile?.email_verified && profile.email.endsWith('@gmail.com')) {
        const userExists = await userRepository.findOne({
          where: { email: profile.email },
        })

        // If the user does not exist, create a new one
        if (!userExists) {
          const newUser = await userRepository.save(
            userRepository.create({
              sub: profile.sub,
              email: profile.email,
              username: profile.name || '',
              picture: profile.picture || '',
            })
          )
          const savedPicture = AppDataSource.getRepository(Picture).create({
            filename: "Google Profile Picture",
            path: newUser.picture,
            userId: newUser.id, // Use the ID from the saved user
          })
          await pictureRepository.save(savedPicture)
        }
        // userExists = profile
        console.log('Google User', userExists)
        return true // Allow sign-in 
      }

      // Handle Credentials Sign-In
      if (credentials?.email && credentials?.password) {
        try {
          const user = await userRepository.findOne({
            where: { email: credentials.email },
          })

          // Verify the password if the user exists
          if (user) {
            const isPasswordValid = await argon2.verify(user.password, credentials.password)
            if (isPasswordValid) {
              return true // Allow sign-in if password is valid
            }
          }

          // If the user doesn't exist or the password is invalid
          return false // Deny sign-in

        } catch (error: any) {
          console.error("Error during sign-in: ", error.message)
          return false // Deny sign-in on error
        }
      }

      return false // Deny sign-in if no conditions are met
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image || null
      }

      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
