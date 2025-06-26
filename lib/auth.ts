import { NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      // The `clientId` and `clientSecret` are obtained from the Cognito User Pool App Client.
      // The `issuer` is the URL of the Cognito User Pool.
      // We pull these from the environment variables you set up in Step 1.
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
    }),
  ],
  // You can add custom pages if you want to style your own login page.
  // pages: {
  //   signIn: '/auth/signin',
  // },
};
