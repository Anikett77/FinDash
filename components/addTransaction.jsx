"use client"
import { useState, useEffect } from "react"

export default function AddTransactionModal({ open, onClose, onSuccess, editData }) {
  const [form, setForm] = useState({
    description: "", amount: "", date: "", type: "expense", category: "Other", status: "pending",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")

  // if editData is passed, pre-fill the form
  useEffect(() => {
    if (editData) {
      setForm({
        description: editData.description,
        amount:      editData.amount,
        date:        new Date(editData.date).toISOString().split("T")[0], // format for input[type=date]
        type:        editData.type,
        category:    editData.category,
        status:      editData.status,
      })
    } else {
      // reset form when opening for add
      setForm({ description: "", amount: "", date: "", type: "expense", category: "Other", status: "pending" })
    }
  }, [editData, open])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const isEdit = !!editData

      const res = await fetch("/api/transactions", {
        method:  isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(isEdit ? { ...form, _id: editData._id } : form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
        return
      }

      onClose()
      onSuccess?.()

    } catch (err) {
      setError("Network error, please try again")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  const isEdit = !!editData

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white max-w-xl w-full rounded-lg shadow-lg p-6 relative">

        <div className="mb-4">
          <h2 className="text-lg font-semibold">{isEdit ? "Edit Transaction" : "Add New Transaction"}</h2>
          <p className="text-sm text-gray-500">{isEdit ? "Update the transaction details." : "Fill in the details for your new transaction."}</p>
        </div>

        {error && (
          <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-medium">Description</label>
            <input name="description" value={form.description} onChange={handleChange}
              placeholder="e.g., Office supplies"
              className="w-full border border-gray-500/30 rounded-md p-2 mt-1" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Amount</label>
              <input type="number" name="amount" value={form.amount} onChange={handleChange}
                placeholder="0.00" className="w-full border border-gray-500/30 rounded-md p-2 mt-1" required />
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange}
                className="w-full border border-gray-500/30 rounded-md p-2 mt-1" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Type</label>
              <select name="type" value={form.type} onChange={handleChange}
                className="w-full border border-gray-500/30 rounded-md p-2 mt-1">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full border border-gray-500/30 rounded-md p-2 mt-1">
                <option>Income</option>
                <option>Supplies</option>
                <option>Rent</option>
                <option>Utilities</option>
                <option>Software</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <select name="status" value={form.status} onChange={handleChange}
              className="w-full border border-gray-500/30 rounded-md p-2 mt-1">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 border border-gray-500/30 rounded-md">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50">
              {loading ? "Saving..." : isEdit ? "Update Transaction" : "Save Transaction"}
            </button>
          </div>
        </form>

        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">✕</button>
      </div>
    </div>
  )
}