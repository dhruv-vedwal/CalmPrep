import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "default_fallback_secret_for_development_and_builds_32char_minimum_length",
  trustHost: true,
  providers: [], // Added in full auth.ts configuration
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth',
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;
