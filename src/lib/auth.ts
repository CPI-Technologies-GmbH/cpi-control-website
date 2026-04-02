import NextAuth from "next-auth";

const CPI_AUTH_URL = "https://auth.cpi.dev";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "cpi-auth",
      name: "CPI Auth",
      type: "oauth",
      clientId: process.env.CPI_AUTH_CLIENT_ID!,
      clientSecret: process.env.CPI_AUTH_CLIENT_SECRET || "unused",
      authorization: {
        url: `${CPI_AUTH_URL}/oauth/authorize`,
        params: { scope: "openid profile email" },
      },
      token: `${CPI_AUTH_URL}/oauth/token`,
      userinfo: `${CPI_AUTH_URL}/oauth/userinfo`,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub as string,
          name: profile.name as string,
          email: profile.email as string,
          image: profile.picture as string | undefined,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.sub = (profile?.sub as string) || token.sub;
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
