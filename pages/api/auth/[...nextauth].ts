import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

if (
  !process.env.COGNITO_CLIENT_ID ||
  !process.env.COGNITO_CLIENT_SECRET ||
  !process.env.COGNITO_ISSUER
) {
  throw Error("Missing env vars");
}

export const authOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
};

export default NextAuth(authOptions);
