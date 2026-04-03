"use client";
import { useEffect, useState } from "react";

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/transactions")
        if (!res.ok) return
        const data = await res.json()
        setTransactions(Array.isArray(data) ? data : data.transactions ?? [])
      } catch (err) {
        console.log("Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTransactions()
  }, [])

  if (loading) return <p className="p-4 text-gray-400 text-sm">Loading...</p>

  return (
    <div className="bg-white text-black rounded-xl border border-gray-400/20 p-6 shadow-sm mt-10">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <p className="text-sm text-gray-400">Your latest financial activity</p>
      </div>

      {/* Empty state */}
      {transactions.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-6">No transactions yet.</p>
      )}

      {/* List */}
      <div className="space-y-4">
        {transactions.map((tx) => {
          const isIncome = tx.type === "income"

          return (
            <div key={tx._id}
              className="flex items-center justify-between p-3 border border-gray-800/20 rounded-lg hover:bg-gray-400/40 transition">

              {/* Left */}
              <div>
                <p className="font-medium">{tx.description}</p>
                <p className="text-sm text-gray-400">
                  {tx.category} • {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <span className={`text-sm font-semibold ${isIncome ? "text-green-500" : "text-red-500"}`}>
                  {isIncome ? "+" : "-"}₹{Math.abs(tx.amount).toLocaleString()}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tx.status === "completed" ? "bg-green-100 text-green-700" :
                  tx.status === "pending"   ? "bg-yellow-100 text-yellow-700" :
                                              "bg-red-100 text-red-700"
                }`}>
                  {tx.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}