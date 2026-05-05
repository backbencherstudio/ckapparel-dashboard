import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const access = req.cookies.get("access-token")?.value;
  const isProtected = url.pathname.startsWith("/dashboard");

  if (!access && isProtected) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (access && url.pathname === "/login") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};