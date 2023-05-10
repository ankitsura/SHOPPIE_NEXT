import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

const adminEmails = ['suraankit6@gmail.com'];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session}) => {
        return session;
      }
    }
}

export const isAdminRequest = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
  return session;
}

export default NextAuth(authOptions);