"use client"
import { useState, useEffect } from "react"
import BalanceChart from "@/components/balanceChart"
import RecentTransactions from "@/components/recentTransaction"
import { useRouter } from "next/navigation"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts"

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"]

export default function DashboardPage() {
  const [user, setUser]                 = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const res  = await fetch("/api/me")
      const data = await res.json()
      setUser(data)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      try {
        const res  = await fetch("/api/transactions")
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

  const now = new Date()
  const monthlyTransactions = transactions.filter(t => {
    const d = new Date(t.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })

  const totalIncome    = monthlyTransactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0)
  const totalExpense   = monthlyTransactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0)
  const netBalance     = totalIncome - totalExpense
  const totalTx        = monthlyTransactions.length

  const barData = transactions.reduce((acc, t) => {
    const month    = new Date(t.date).toLocaleString("en-US", { month: "short" })
    const existing = acc.find(d => d.month === month)
    if (existing) existing[t.type] = (existing[t.type] || 0) + t.amount
    else acc.push({ month, [t.type]: t.amount })
    return acc
  }, [])

  const pieData = monthlyTransactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      const existing = acc.find(d => d.name === t.category)
      if (existing) existing.value += t.amount
      else acc.push({ name: t.category, value: t.amount })
      return acc
    }, [])

  const stats = [
    {
      label: "Total Income", value: `₹${totalIncome.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      sub: "From all sources", trend: "+12% from last month", trendUp: true,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
    },
    {
      label: "Total Expenses", value: `₹${totalExpense.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      sub: "Across all categories", trend: "-5% from last month", trendUp: false,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 rotate-180"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
    },
    {
      label: "Net Balance", value: `₹${netBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      sub: "Net position", trend: "+8% from last month", trendUp: true,
      icon: <span className="text-gray-500 text-sm font-medium">₹</span>
    },
    {
      label: "Transactions", value: totalTx,
      sub: "This month", trend: null,
      icon: <span className="text-base">💳</span>
    },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl md:text-3xl text-gray-900">
          Welcome back, {user?.name ?? "..."}
        </h1>
        <p className="text-sm mt-1 text-gray-500">Here's your financial overview</p>
      </div>

      {/* Stat cards — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-gray-400/40 rounded-2xl p-5">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">{s.label}</p>
              {s.icon}
            </div>
            <div className="text-xl md:text-2xl font-bold mt-8 text-gray-900">{s.value}</div>
            <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
            {s.trend && (
              <p className={`font-bold mt-2 text-xs ${s.trendUp ? "text-green-600" : "text-red-600"}`}>
                {s.trend}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Charts — stacked on mobile, side by side on desktop */}
      <div className="flex flex-col lg:flex-row gap-5">

        {/* Bar chart */}
        <div className="w-full lg:w-4/6 bg-white border border-gray-400/40 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-gray-900">Income vs Expenses</h2>
          <p className="text-sm text-gray-400 mb-4">Monthly comparison</p>
          <div className="w-full h-[260px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="income"  fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart */}
        <div className="w-full lg:w-2/6 bg-white border border-gray-400/40 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-gray-900">Expenses by Category</h2>
          <p className="text-sm text-gray-400 mb-4">This month's distribution</p>
          <div className="w-full h-[260px] md:h-[300px]">
            {pieData.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-sm text-gray-400">No expenses this month</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius="70%"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Balance chart + recent transactions */}
      <BalanceChart />
      <RecentTransactions />

    </div>
  )
}