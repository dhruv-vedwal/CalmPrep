import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req: any) => {
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
  const isPublic = req.nextUrl.pathname === '/' || isAuthPage;

  if (!req.auth && !isPublic) {
    return NextResponse.redirect(new URL('/auth', req.nextUrl));
  }

  if (isAuthPage && req.auth) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
