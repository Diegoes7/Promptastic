import NextAuth from "next-auth";
import { TypeORMAdapter } from "@auth/typeorm-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: TypeORMAdapter(process.env.AUTH_TYPEORM_CONNECTION ?? ''),
} as any);