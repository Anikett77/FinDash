import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  let user = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      user = payload;
    } catch (err) {
      user = null;
    }
  }

  if (!user) {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/analytics")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }


  if (pathname === "/login" || pathname === "/signup") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (user.role === "viewer") {
    if (pathname.startsWith("/analytics")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }


  if (user.role === "analyst") {

  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/analytics/:path*", "/login", "/signup"],
};