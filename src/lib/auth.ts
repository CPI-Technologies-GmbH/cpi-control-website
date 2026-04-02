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
        params: {
          scope: "openid profile email",
          response_type: "code",
        },
      },

      // Custom token handler: strip id_token to prevent issuer validation
      token: {
        url: `${CPI_AUTH_URL}/oauth/token`,
        async conform(response: Response) {
          const body = await response.json();
          // Remove id_token so next-auth doesn't try to validate its issuer
          delete body.id_token;
          return new Response(JSON.stringify(body), {
            status: response.status,
            headers: { "Content-Type": "application/json" },
          });
        },
      },

      userinfo: {
        url: `${CPI_AUTH_URL}/oauth/userinfo`,
      },

      checks: ["pkce", "state"],

      profile(profile: any) {
        return {
          id: profile.sub || profile.id || "",
          name: profile.name || profile.email || "",
          email: profile.email || "",
          image: profile.picture || null,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        if (profile?.sub) token.sub = profile.sub as string;
        if (profile?.email) token.email = profile.email as string;
        if (profile?.name) token.name = profile.name as string;
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
