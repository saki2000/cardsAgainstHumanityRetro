import { NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

// Extend the Session type to include accessToken
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
      authorization: {
        params: {
          scope: "openid email aws.cognito.signin.user.admin",
        },
      },
    }),
  ],
  pages: {
    signOut: `${process.env.COGNITO_ISSUER}/logout?client_id=${process.env.COGNITO_CLIENT_ID}&logout_uri=${process.env.NEXTAUTH_URL}`,
  },
  callbacks: {
    async jwt({ token, profile, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
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
      session.accessToken =
        typeof token.accessToken === "string" ? token.accessToken : undefined;
      return session;
    },
  },
};
