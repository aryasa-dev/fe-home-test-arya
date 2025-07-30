import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("ACCESS_TOKEN")?.value;

  const protectedPaths = ["/", "/articles", "/profile", "/admin"];
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) =>
    pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/articles/:path*", "/profile/:path*", "/admin/:path*"],
};
