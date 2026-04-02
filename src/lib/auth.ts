import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "cpi-auth",
      name: "CPI Auth",
      type: "oidc",
      issuer: "https://auth.cpi.dev",
      clientId: process.env.CPI_AUTH_CLIENT_ID!,
      clientSecret: process.env.CPI_AUTH_CLIENT_SECRET || "",
      authorization: {
        params: { scope: "openid profile email" },
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.sub = profile?.sub as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  trustHost: true,
});
