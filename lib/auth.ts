import { NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
    }),
  ],
  pages: {
    signOut: `${process.env.COGNITO_ISSUER}/logout?client_id=${process.env.COGNITO_CLIENT_ID}&logout_uri=${process.env.NEXTAUTH_URL}`,
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.name = (profile as Record<string, unknown>)[
          "cognito:username"
        ] as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
      }
      return session;
    },
  },
};
