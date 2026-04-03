"use client";
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


export default function BalanceChart() {

      const [transactions, setTransactions] = useState([])
          const [loading, setLoading]         = useState(true)

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/transactions")
      if (!res.ok) return
      const data = await res.json()
      console.log(data) // check what API returns, remove after
      setTransactions(Array.isArray(data) ? data : data.transactions ?? [])
    } catch (err) {
      console.log("Error:", err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchTransactions()
  }, [])

const lineData = transactions
  .reduce((acc, t) => {
    const dateObj = new Date(t.date)
    const month = dateObj.toLocaleString("en-US", { month: "short" })

    let existing = acc.find(d => d.month === month)

    if (!existing) {
      existing = {
        month,
        date: new Date(dateObj.getFullYear(), dateObj.getMonth(), 1), // important
        income: 0,
        expense: 0,
        balance: 0
      }
      acc.push(existing)
    }

    if (t.type === "income") {
      existing.income += t.amount
    } else {
      existing.expense += t.amount
    }

    existing.balance = existing.income - existing.expense

    return acc
  }, [])
  .sort((a, b) => a.date - b.date) // 🔥 THIS LINE FIXES EVERYTHING
  
  return (
    <div className="bg-white text-black rounded-xl border border-gray-400/20 p-6 shadow-sm">
      
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Balance Trend</h2>
        <p className="text-sm text-gray-400">
          Your net balance over the last 6 months
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />

            <XAxis dataKey="month" stroke="#aaa" />
            <YAxis stroke="#aaa" />

            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="balance"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}