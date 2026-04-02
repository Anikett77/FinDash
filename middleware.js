import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  let user = null;

  // 🟢 Verify token
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      user = payload;
    } catch (err) {
      user = null;
    }
  }

  // 🔴 Not logged in → block protected routes
  if (!user) {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/analytics")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // 🟢 Already logged in → block auth pages
  if (pathname === "/login" || pathname === "/signup") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 🔐 ROLE-BASED ACCESS

  // 👀 Viewer → only dashboard
  if (user.role === "viewer") {
    if (pathname.startsWith("/analytics")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // 📊 Analyst → dashboard + analytics
  if (user.role === "analyst") {
    // (can access analytics, no restriction here)
  }

  // 👑 Admin → full access (no restriction)

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/analytics/:path*", "/login", "/signup"],
};