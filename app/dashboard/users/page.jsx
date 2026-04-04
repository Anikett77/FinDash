"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const roleColors = {
  admin:   "bg-purple-100 text-purple-800",
  analyst: "bg-blue-100 text-blue-800",
  viewer:  "bg-gray-100 text-gray-800",
}

export default function UserManagement({ message = "You don't have permission to view this page." }) {
  const [currentRole, setCurrentRole]     = useState(null)
  const [currentUserId, setCurrentUserId] = useState(null)
  const [users, setUsers]                 = useState([])
  const [loading, setLoading]             = useState(true)
  const [search, setSearch]               = useState("")
  const [roleFilter, setRoleFilter]       = useState("all")
  const [editingId, setEditingId]         = useState(null)
  const [newRole, setNewRole]             = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("/api/me")
        if (!res.ok) return
        const data = await res.json()
        setCurrentRole(data.role)
        setCurrentUserId(data._id || data.id)
      } catch (err) { console.log("Error:", err) }
    }
    fetchMe()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res  = await fetch("/api/users")
      if (!res.ok) return
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) { console.log("Error:", err) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchUsers() }, [])

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return
    try {
      const res  = await fetch("/api/users", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: id }) })
      const data = await res.json()
      if (!res.ok) { alert(data.error); return }
      setUsers(prev => prev.filter(u => u._id !== id))
    } catch (err) { console.log("Error:", err) }
  }

  const handleRoleUpdate = async (id) => {
    try {
      const res  = await fetch("/api/users", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ _id: id, role: newRole }) })
      const data = await res.json()
      if (!res.ok) { alert(data.error); return }
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role: data.role } : u))
      setEditingId(null)
    } catch (err) { console.log("Error:", err) }
  }

  if (currentRole === null) return <p className="p-4">Loading...</p>

  if (currentRole === "viewer" || currentRole === "analyst") {
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
              <span className="text-sm text-gray-700">Admin role required</span>
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

  const totalUsers   = users.length
  const adminCount   = users.filter(u => u.role === "admin").length
  const analystCount = users.filter(u => u.role === "analyst").length
  const viewerCount  = users.filter(u => u.role === "viewer").length

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole   = roleFilter === "all" || u.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
        <p className="text-gray-500 mt-1 text-sm">Manage team members and permissions</p>
      </div>

      {/* Role cards — 1 col mobile, 3 desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { role: "Viewer",  desc: "Read-only access. Can view records but cannot add, edit, or delete data." },
          { role: "Analyst", desc: "Full data access. Can view transactions and analytics." },
          { role: "Admin",   desc: "Full system access. Can manage users, assign roles, and delete transactions." },
        ].map((item, i) => (
          <div key={i} className="border border-gray-200 bg-white p-5 rounded-xl shadow-sm">
            <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 capitalize font-medium">{item.role}</span>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats — 2 col mobile, 4 desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat title="Total Users" value={totalUsers} />
        <Stat title="Admins"      value={adminCount} />
        <Stat title="Analysts"    value={analystCount} />
        <Stat title="Viewers"     value={viewerCount} />
      </div>

      {/* Filters */}
      <div className="border border-gray-200 bg-white rounded-xl p-5 space-y-3">
        <h2 className="font-semibold text-sm">Filters & Search</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input type="text" placeholder="Search by name or email..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-300 bg-white p-2 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-blue-900/20" />
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
            className="border border-gray-300 bg-white p-2 rounded-lg text-sm outline-none">
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="analyst">Analyst</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      </div>

      {/* User list */}
      <div className="border border-gray-200 bg-white rounded-xl p-5 space-y-3">
        <h2 className="font-semibold text-sm mb-1">Users ({filtered.length})</h2>

        {loading ? (
          <p className="text-sm text-gray-400 text-center py-8">Loading users...</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No users found.</p>
        ) : (
          filtered.map(u => (
            <div key={u._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-gray-100 bg-white p-3 rounded-xl hover:bg-gray-50 transition-colors">

              {/* Left */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-800 text-sm flex-shrink-0">
                  {u.name?.[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {u.name}
                    {u._id === currentUserId && <span className="ml-2 text-xs text-gray-400 font-normal">(you)</span>}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{u.email}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2 flex-wrap">
                {editingId === u._id ? (
                  <>
                    <select value={newRole} onChange={e => setNewRole(e.target.value)}
                      className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 outline-none">
                      <option value="viewer">Viewer</option>
                      <option value="analyst">Analyst</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button onClick={() => handleRoleUpdate(u._id)}
                      className="text-xs px-3 py-1.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)}
                      className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                  </>
                ) : (
                  <span className={`text-xs px-3 py-1 rounded-full capitalize font-medium ${roleColors[u.role] || "bg-gray-100 text-gray-700"}`}>
                    {u.role}
                  </span>
                )}

                {u._id !== currentUserId && (
                  <>
                    <button onClick={() => { setEditingId(u._id); setNewRole(u.role) }}
                      className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(u._id)}
                      className="text-xs px-3 py-1.5 border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function Stat({ title, value }) {
  return (
    <div className="border border-gray-200 bg-white p-5 rounded-xl">
      <p className="text-xs text-gray-500 mb-5">{title}</p>
      <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
    </div>
  )
}