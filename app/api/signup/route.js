import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  await connectDB();

  const { name, email, password, role } = await req.json();

  // for validi
  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields required" },
      { status: 400 }
    );
  }

  const allowedRoles = ["viewer", "analyst", "admin"];

  if (role && !allowedRoles.includes(role)) {
    return NextResponse.json(
      { message: "Invalid role" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  // creating user with role
  await User.create({
    name,
    email,
    password,
    role: role || "viewer"
  });

  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}