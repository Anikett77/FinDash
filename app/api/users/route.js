import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { User } from "@/models/User"

function getUserFromRequest(request) {
  const token = request.cookies.get("token")?.value
  if (!token) return null
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}

// ── GET /api/users — fetch all users ─────────────────────────────────────────
export async function GET(request) {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (user.role !== "admin") return NextResponse.json({ error: "Admins only" }, { status: 403 })

  await connectDB()
  // never send passwords to frontend
  const users = await User.find().select("-password").sort({ createdAt: -1 })
  return NextResponse.json(users)
}

// ── PUT /api/users — update role ──────────────────────────────────────────────
export async function PUT(request) {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (user.role !== "admin") return NextResponse.json({ error: "Admins only" }, { status: 403 })

  await connectDB()
  const { _id, role } = await request.json()

  if (!_id || !role) return NextResponse.json({ error: "ID and role required" }, { status: 400 })
  if (!["viewer", "analyst", "admin"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 })
  }

  // prevent admin from changing their own role
  if (user.userId === _id) {
    return NextResponse.json({ error: "You cannot change your own role" }, { status: 400 })
  }

  const updated = await User.findByIdAndUpdate(_id, { role }, { new: true }).select("-password")
  if (!updated) return NextResponse.json({ error: "User not found" }, { status: 404 })

  return NextResponse.json(updated)
}

// ── DELETE /api/users — delete a user ────────────────────────────────────────
export async function DELETE(request) {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (user.role !== "admin") return NextResponse.json({ error: "Admins only" }, { status: 403 })

  await connectDB()
  const { _id } = await request.json()

  if (!_id) return NextResponse.json({ error: "ID required" }, { status: 400 })

  // prevent admin from deleting themselves
  if (user.userId === _id) {
    return NextResponse.json({ error: "You cannot delete yourself" }, { status: 400 })
  }

  await User.findByIdAndDelete(_id)
  return NextResponse.json({ message: "User deleted" })
}