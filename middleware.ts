import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get("auth")?.value;
  const { pathname } = req.nextUrl;

  // Protect dashboard route: redirect to login if not logged in
  if (pathname === "/chat" && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Prevent access to login/register if already logged in
  if ((pathname === "/login" || pathname === "/register") && isAuthenticated) {
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat", "/login", "/register"],
};
