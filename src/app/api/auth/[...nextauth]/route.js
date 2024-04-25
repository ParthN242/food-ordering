import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connect from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

export const authoption = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",
      id: "credentials",

      async authorize(credentials, req) {
        const { email, password } = credentials;

        connect();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid Credential");
        }

        const correctPassword = bcryptjs.compareSync(password, user.password);

        if (!correctPassword) {
          throw new Error("Invalid Credential");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn(user) {
      const { email } = user.user;

      const exsitsUserd = await User.findOne({ email });

      if (!exsitsUserd) {
        await User.create({ email });
      }

      return user;
    },
  },
};

export async function isAdmin() {
  const session = await getServerSession(authoption);

  const { email } = session.user;

  if (!email) return false;

  const userInfo = await User.findOne({ email });

  if (!userInfo.admin) return false;

  return true;
}

const handler = NextAuth(authoption);

export { handler as GET, handler as POST };
