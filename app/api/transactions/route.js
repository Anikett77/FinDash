import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { Transaction } from "@/models/Transaction"

function getUserFromRequest(request) {
  const token = request.cookies.get("token")?.value
  if (!token) return null
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}

// ── GET /api/transactions ─────────────────────────────────────────────────────
export async function GET(request) {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await connectDB()
  const transactions = await Transaction.find().sort({ date: -1 })
  return NextResponse.json(transactions)
}

// ── POST /api/transactions ────────────────────────────────────────────────────
export async function POST(request) {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (user.role !== "admin") return NextResponse.json({ error: "Admins only" }, { status: 403 })

  await connectDB()
  const { description, amount, date, type, category, status } = await request.json()

  if (!description || !amount || !date || !type || !category) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 })
  }

  const transaction = await Transaction.create({
    description, type, category,
    amount:  parseFloat(amount),
    date:    new Date(date),
    status:  status || "pending",
    userId:  user.userId,
  })

  return NextResponse.json(transaction, { status: 201 })
}

// ── PUT /api/transactions — edit existing ─────────────────────────────────────
export async function PUT(request) {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (user.role !== "admin") return NextResponse.json({ error: "Admins only" }, { status: 403 })

  await connectDB()
  const { _id, description, amount, date, type, category, status } = await request.json()

  if (!_id) return NextResponse.json({ error: "ID required" }, { status: 400 })

  const updated = await Transaction.findByIdAndUpdate(
    _id,
    { description, type, category, status, amount: parseFloat(amount), date: new Date(date) },
    { new: true }
  )

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(updated)
}

// ── DELETE /api/transactions ──────────────────────────────────────────────────
export async function DELETE(request) {
  const user = getUserFromRequest(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (user.role !== "admin") return NextResponse.json({ error: "Admins only" }, { status: 403 })

  await connectDB()
  const { _id } = await request.json()

  if (!_id) return NextResponse.json({ error: "ID required" }, { status: 400 })

  await Transaction.findByIdAndDelete(_id)
  return NextResponse.json({ message: "Deleted" })
}