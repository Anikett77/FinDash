"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid,
} from "recharts"

const COLORS = ["#8b5cf6", "#10b981", "#ef4444", "#3b82f6", "#f59e0b", "#ec4899"]

export default function AnalyticsPage({ message = "You don't have permission to view this page." }) {
  const [role, setRole]                 = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading]           = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res  = await fetch("/api/me")
        if (!res.ok) return
        const data = await res.json()
        setRole(data.role)
      } catch (err) { console.log("Error:", err) }
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
      } catch (err) { console.log("Error:", err) }
      finally { setLoading(false) }
    }
    fetchTransactions()
  }, [])

  const now = new Date()
  const monthly = transactions.filter(t => {
    const d = new Date(t.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })

  const totalIncome       = transactions.filter(t => t.type === "income").reduce((s, t)  => s + t.amount, 0)
  const totalExpense      = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0)
  const netBalance        = totalIncome - totalExpense
  const totalTransactions = transactions.length
  const completedCount    = transactions.filter(t => t.status === "completed").length

  // balance trend by month
  const balanceByMonth = {}
  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString("en-US", { month: "short" })
    if (!balanceByMonth[month]) balanceByMonth[month] = 0
    balanceByMonth[month] += t.type === "income" ? t.amount : -t.amount
  })
  const balanceData = Object.entries(balanceByMonth).map(([month, balance]) => ({ month, balance: Math.round(balance) }))

  // category pie
  const categoryMap = {}
  transactions.filter(t => t.type === "expense").forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount
  })
  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value: Math.round(value) }))

  // type pie — this month
  const typeData = [
    { name: "Income",  value: monthly.filter(t => t.type === "income").length  },
    { name: "Expense", value: monthly.filter(t => t.type === "expense").length },
  ]

  // status bar — this month
  const statusMap = {}
  monthly.forEach(t => { statusMap[t.status] = (statusMap[t.status] || 0) + 1 })
  const statusData = Object.entries(statusMap).map(([name, value]) => ({ name, value }))

  // category table — this month
  const categoryDetails = {}
  monthly.forEach(t => {
    if (!categoryDetails[t.category]) categoryDetails[t.category] = { count: 0, total: 0 }
    categoryDetails[t.category].count += 1
    categoryDetails[t.category].total += t.amount
  })

  if (role === null) return <p className="p-4">Loading...</p>

  if (role === "viewer") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 max-w-md w-full text-center">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg width="26" height="26" fill="none" stroke="#ef4444" strokeWidth="1.75" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Access Restricted</h1>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">{message}</p>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Required Access</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-sm text-gray-700">Admin or Analyst role required</span>
            </div>
          </div>
          <button onClick={() => router.push("/dashboard")}
            className="w-full bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-800 transition-colors">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Analytics</h1>
          <p className="text-gray-500 mt-1 text-sm">Detailed financial insights and trends</p>
        </div>
        <span className="bg-gray-100 text-xs px-3 py-1.5 rounded-lg uppercase font-medium self-start">
          {role} · {totalTransactions} transactions
        </span>
      </div>

      {/* Year label */}
      <p className="text-base font-medium text-gray-700">
        Total financial insight — Financial Year 2026
      </p>

      {/* Stats — 2 col mobile, 5 desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: "Transactions", value: totalTransactions,  sub: "All records",          icon: "💳",    color: "" },
          { label: "Total Income",   value: `₹${totalIncome.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,   sub: "From all sources",      icon: null, color: "text-green-600", svg: "up"   },
          { label: "Total Expenses", value: `₹${totalExpense.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,  sub: "Across all categories", icon: null, color: "text-red-600",   svg: "down" },
          { label: "Net Balance",    value: `₹${netBalance.toLocaleString("en-IN",   { minimumFractionDigits: 2 })}`,  sub: "Net position",          icon: "₹",  color: netBalance >= 0 ? "text-green-600" : "text-red-600" },
          { label: "Completed",      value: completedCount,  sub: `${totalTransactions > 0 ? Math.round((completedCount / totalTransactions) * 100) : 0}% completion`, icon: "✅", color: "" },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-gray-400/40 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-6">
              <p className="text-xs text-gray-600">{s.label}</p>
              {s.svg === "up"   && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>}
              {s.svg === "down" && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 rotate-180"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>}
              {s.icon && <span className="text-sm">{s.icon}</span>}
            </div>
            <div className={`text-lg md:text-2xl font-bold ${s.color}`}>{s.value}</div>
            <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts 2x2 grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <Card>
          <CardHeader>
            <CardTitle>Balance Trend</CardTitle>
            <CardDescription>Net balance grouped by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={balanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                  <Line type="monotone" dataKey="balance" stroke="#1e3a8a" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>Distribution of spending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius="70%"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                    {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Types</CardTitle>
            <CardDescription>Income vs Expense — this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={typeData} dataKey="value" nameKey="name" outerRadius="70%"
                    label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                    <Cell fill="#10b981" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Overview</CardTitle>
            <CardDescription>Transactions by status — this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Category details table */}
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>Breakdown per category — this month</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : Object.keys(categoryDetails).length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No transactions this month.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px]">
                <thead className="border-b border-gray-200">
                  <tr className="text-xs text-gray-500">
                    <th className="text-left py-2 font-medium">Category</th>
                    <th className="text-right font-medium">Count</th>
                    <th className="text-right font-medium">Total</th>
                    <th className="text-right font-medium">Average</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(categoryDetails).map(([name, { count, total }]) => (
                    <tr key={name} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2.5 font-medium text-sm">{name}</td>
                      <td className="text-right text-sm">{count}</td>
                      <td className="text-right font-semibold text-sm">₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="text-right text-gray-500 text-sm">₹{(total / count).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}