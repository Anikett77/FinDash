import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

        // 🔥 create JWT
    const token = jwt.sign(
      { userId: user._id,
        role: user.role
       }, // payload
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // create response FIRST
    const response = NextResponse.json(
      { message: "Login success" },
      { status: 200 }
    );

    // then set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    // return response
    return response;

  } catch (err) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}