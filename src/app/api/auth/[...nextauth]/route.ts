import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/prismadb";

interface ErrorFields {
  [key: string]: string | undefined;
}

export class AuthenticationError extends Error {
  errorFields: ErrorFields;

  constructor(message: string, errorFields: ErrorFields) {
    super(message);
    this.name = "AuthenticationError";
    this.errorFields = errorFields;
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        
        if (!email || !password) {
          const errorFields: ErrorFields = {
            email: !email ? "Invalid Email" : undefined,
            password: !password ? "Invalid Password" : undefined,
          };
          throw new AuthenticationError("Invalid Credentials", errorFields);
        }

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user || !user.hashedPassword) {
          const errorFields: ErrorFields = {
            email: "Email is not found ",
            password: "Password is not found",
          };
          throw new AuthenticationError("User not aa found!", errorFields);
        }

        const isCorrectPassword = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          const errorFields = {
            password: "password is not match",
          };
          throw new AuthenticationError("Password is not match!", errorFields);
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
