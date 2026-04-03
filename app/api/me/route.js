import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token");



  if (!token) {
    return NextResponse.json(
      { message: "unauthorised" },
      { status: 401 }
    );
  }

  let decoded;

  try {
    decoded = jwt.verify(
      token.value,
      process.env.JWT_SECRET
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }




  const user = await User.findById(decoded.userId);



  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    name: user.name,
    role: user.role,
  });
}