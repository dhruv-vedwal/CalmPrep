import NextAuth, { type DefaultSession } from "next-auth";

// Extend the session types to include `id`
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    examType?: string;
  }
}
