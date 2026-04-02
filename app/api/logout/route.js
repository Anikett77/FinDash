import { NextResponse } from "next/server";

export async function GET() {
  // ✅ STEP 1: create response
  const response = NextResponse.json({
    message: "Logged out",
  });

  // ✅ STEP 2: delete cookie by expiring it
  response.cookies.set("token", "", {
    expires: new Date(0), // 💣 expire instantly
    path: "/",
  });

  return response;
}