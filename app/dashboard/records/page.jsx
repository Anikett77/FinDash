"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AddTransactionModal from "@/components/addTransaction"

export default function FinancialRecords({message = "You don't have permission to view this page."}) {
  const [role, setRole]                 = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading]           = useState(true)
  const [search, setSearch]             = useState("")
  const [typeFilter, setTypeFilter]     = useState("all")
  const [sortOrder, setSortOrder]       = useState("newest")
  const [open, setOpen]                 = useState(false)
  const [editData, setEditData]         = useState(null)  // holds transaction being edited
  const router = useRouter()

  // fetch role
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me")
        if (!res.ok) return
        const data = await res.json()
        setRole(data.role)
      } catch (err) {
        console.log("Error:", err)
      }
    }
    fetchUser()
  }, [])

  // fetch transactions
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

  useEffect(() => { fetchTransactions() }, [])

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Delete this transaction?")) return

    try {
      const res = await fetch("/api/transactions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      })

      if (res.ok) {
        // remove from state instantly without re-fetching
        setTransactions(prev => prev.filter(t => t._id !== id))
      } else {
        const data = await res.json()
        alert(data.error || "Delete failed")
      }
    } catch (err) {
      console.log("Error:", err)
    }
  }

  // ── Edit — open modal pre-filled ─────────────────────────────────────────
  const handleEdit = (transaction) => {
    setEditData(transaction)  // pass data to modal
    setOpen(true)
  }

  // ── After modal save (add or edit) ───────────────────────────────────────
  const handleSuccess = () => {
    setEditData(null)
    fetchTransactions()
  }

  // loading + access denied
  if (role === null) return <p className="p-4">Loading...</p>

  if (role === "viewer") {
    return (
<div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-12 max-w-md w-full text-center">
 
        {/* Icon */}
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" fill="none" stroke="#ef4444" strokeWidth="1.75" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
 
        {/* Text */}
        <h1 className="text-xl font-bold text-gray-900 mb-2">Access Restricted</h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">{message}</p>
 
        {/* Role info */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-8 text-left">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Required Access</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-sm text-gray-700">Admin or Analyst role required</span>
          </div>
        </div>
 
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-800 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
    )
  }

  // stats
  const totalIncome  = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0)
  const netBalance   = totalIncome - totalExpense

  // filter + sort
  const filtered = transactions
    .filter(t => {
      const matchSearch = t.description.toLowerCase().includes(search.toLowerCase())
      const matchType   = typeFilter === "all" || t.type === typeFilter
      return matchSearch && matchType
    })
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    )

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Records</h1>
          <p className="text-gray-500 mt-2">Add, edit, and manage your transactions</p>
        </div>
        {role === "admin" && (
          <button onClick={() => { setEditData(null); setOpen(true) }}
            className="flex items-center gap-2 rounded-md bg-blue-950 text-white px-4 py-2 hover:bg-blue-900/80">
            + Add Transaction
          </button>
        )}
      </div>

      {/* STATS */}
            <h1 className=" text-lg font-medium font-serif">This is the total financial insight of this financial year 2026</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Income"   value={`₹${totalIncome.toLocaleString("en-IN",  { minimumFractionDigits: 2 })}`} color="green" />
        <Card title="Total Expenses" value={`₹${totalExpense.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`} color="red" />
        <Card title="Net Balance"    value={`₹${netBalance.toLocaleString("en-IN",   { minimumFractionDigits: 2 })}`} color={netBalance >= 0 ? "green" : "red"} />
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-xl border border-gray-400/30 p-6 space-y-4 shadow-sm">
        <h2 className="text-lg font-semibold">Filters & Search</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
            className="border border-gray-400/30 rounded-md px-3 py-2" />
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            className="border border-gray-400/30 rounded-md px-3 py-2">
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}
            className="border border-gray-400/30 rounded-md px-3 py-2">
            <option value="newest">Date (Newest)</option>
            <option value="oldest">Date (Oldest)</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-gray-400/30 shadow-sm p-6">
        <div className="border-b border-gray-400/30 mb-4">
          <h2 className="text-lg font-semibold">Transactions ({filtered.length})</h2>
          <p className="text-sm text-gray-500 mb-5">Showing {filtered.length} of {transactions.length} transactions of this financial year</p>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm py-6 text-center">Loading transactions...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-sm py-6 text-center">No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-400/30">
                <tr className="text-sm text-gray-500">
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left px-4">Category</th>
                  <th className="text-left px-4">Date</th>
                  <th className="text-right px-4">Amount</th>
                  <th className="text-left px-4">Status</th>
                  {role === "admin" && <th className="text-left px-4">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => (
                  <Row
                    key={t._id}
                    transaction={t}
                    role={role}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL — works for both add and edit */}
      <AddTransactionModal
        open={open}
        onClose={() => { setOpen(false); setEditData(null) }}
        onSuccess={handleSuccess}
        editData={editData}   // null = add mode, object = edit mode
      />
    </div>
  )
}

/* ── Components ── */

function Card({ title, value, color }) {
  return (
    <div className="bg-white border border-gray-400/30 rounded-xl p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-2xl font-bold mt-9 ${color === "green" ? "text-green-600" : "text-red-600"}`}>
        {value}
      </h2>
    </div>
  )
}

function Row({ transaction: t, role, onDelete, onEdit }) {
  const isIncome = t.type === "income"
  const statusColors = {
    completed: "bg-green-100 text-green-700",
    pending:   "bg-yellow-100 text-yellow-700",
    failed:    "bg-red-100 text-red-700",
  }

  return (
    <tr className="border-b border-gray-400/30 hover:bg-gray-50">
      <td className="py-3 px-4 font-medium">{t.description}</td>
      <td className="px-4 text-gray-500">{t.category}</td>
      <td className="px-4 text-gray-500">
        {new Date(t.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
      </td>
      <td className={`px-4 text-right font-semibold ${isIncome ? "text-green-600" : "text-red-600"}`}>
        {isIncome ? "+" : "-"}₹{t.amount.toLocaleString()}
      </td>
      <td className="px-4">
        <span className={`text-xs px-2 py-1 rounded ${statusColors[t.status] || "bg-gray-100 text-gray-600"}`}>
          {t.status}
        </span>
      </td>
      {role === "admin" && (
        <td className="px-4">
          <div className="flex gap-2 py-3">
            <button onClick={() => onEdit(t)}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
              Edit
            </button>
            <button onClick={() => onDelete(t._id)}
              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200">
              Delete
            </button>
          </div>
        </td>
      )}
    </tr>
  )
}