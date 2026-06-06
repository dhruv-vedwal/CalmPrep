import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
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
