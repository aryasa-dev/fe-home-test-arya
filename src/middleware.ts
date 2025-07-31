import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("ACCESS_TOKEN")?.value;
  const role = request.cookies.get("USER_ROLE")?.value;
  const pathname = request.nextUrl.pathname;

  const protectedPaths = ["/dashboard", "/articles"];
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && pathname === "/login") {
    if (role === "Admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/articles", request.url));
    }
  }

  if (role === "User" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/articles", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/articles/:path*"],
};
