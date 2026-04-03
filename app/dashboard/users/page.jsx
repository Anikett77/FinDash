"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const roleColors = {
  admin:   "bg-purple-100 text-purple-800",
  analyst: "bg-blue-100 text-blue-800",
  viewer:  "bg-gray-100 text-gray-800",
}

export default function UserManagement({message = "You don't have permission to view this page."}) {
  const [currentRole, setCurrentRole] = useState(null)
  const [currentUserId, setCurrentUserId] = useState(null)
  const [users, setUsers]             = useState([])
  const [loading, setLoading]         = useState(true)
  const [search, setSearch]           = useState("")
  const [roleFilter, setRoleFilter]   = useState("all")
  const [editingId, setEditingId]     = useState(null)   // which user's role is being edited
  const [newRole, setNewRole]         = useState("")
  const router = useRouter()

  // fetch current logged in user
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("/api/me")
        if (!res.ok) return
        const data = await res.json()
        setCurrentRole(data.role)
        setCurrentUserId(data._id || data.id)
      } catch (err) {
        console.log("Error:", err)
      }
    }
    fetchMe()
  }, [])

  // fetch all users from DB
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/users")
      if (!res.ok) return
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      console.log("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])


  // ── Delete user ───────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return
    try {
      const res = await fetch("/api/users", {
        method:  "DELETE",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ _id: id }),
      })
      const data = await res.json()
      if (!res.ok) { alert(data.error); return }
      setUsers(prev => prev.filter(u => u._id !== id))
    } catch (err) {
      console.log("Error:", err)
    }
  }

  // ── Update role ───────────────────────────────────────────────────────────
  const handleRoleUpdate = async (id) => {
    try {
      const res = await fetch("/api/users", {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ _id: id, role: newRole }),
      })
      const data = await res.json()
      if (!res.ok) { alert(data.error); return }
      // update in state directly
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role: data.role } : u))
      setEditingId(null)
    } catch (err) {
      console.log("Error:", err)
    }
  }


  // access control
  if (currentRole === null) return <p className="p-4">Loading...</p>

  if (currentRole === "viewer" || currentRole === "analyst") {
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

  // stats from real data
  const totalUsers   = users.length
  const adminCount   = users.filter(u => u.role === "admin").length
  const analystCount = users.filter(u => u.role === "analyst").length
  const viewerCount  = users.filter(u => u.role === "viewer").length

  // filter + search
  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole   = roleFilter === "all" || u.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div className="p-4 md:p-8 space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-500 mt-2">Manage team members and permissions</p>
        </div>
      </div>

      {/* Role info cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { role: "Viewer",  desc: "Read-only access. Can view financial records but cannot add, edit, or delete data." },
          { role: "Analyst", desc: "Full data access. Can view transactions and analytics." },
          { role: "Admin",   desc: "Full system access. Can manage users, assign roles, and delete transactions." },
        ].map((item, i) => (
          <div key={i} className="border border-gray-500/30 bg-white p-6 rounded-xl shadow-sm">
            <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800 capitalize">{item.role}</span>
            <p className="text-xs text-gray-500 mt-12">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats — from real DB data */}
      <div className="grid md:grid-cols-4 gap-4">
        <Stat title="Total Users" value={totalUsers} />
        <Stat title="Admins"      value={adminCount} />
        <Stat title="Analysts"    value={analystCount} />
        <Stat title="Viewers"     value={viewerCount} />
      </div>

      {/* Filters */}
      <div className="border border-gray-500/30 bg-white rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Filters & Search</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-500/30 bg-white p-2 rounded-md w-full"
          />
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
            className="border border-gray-500/30 bg-white p-2 rounded-md">
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="analyst">Analyst</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      </div>

      {/* User list */}
      <div className="border border-gray-500/30 bg-white rounded-xl p-7 space-y-3">
        <h2 className="font-semibold">Users ({filtered.length})</h2>

        {loading ? (
          <p className="text-sm text-gray-400 text-center py-6">Loading users...</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No users found.</p>
        ) : (
          filtered.map(u => (
            <div key={u._id}
              className="flex justify-between items-center border border-gray-500/30 bg-white p-3 rounded-lg hover:bg-gray-50">

              {/* Left */}
              <div className="flex items-center gap-4">
                {/* Avatar initials */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600 text-sm flex-shrink-0">
                  {u.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">
                    {u.name}
                    {u._id === currentUserId && (
                      <span className="ml-2 text-xs text-gray-400">(you)</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3">

                {/* Role — shows dropdown if being edited */}
                {editingId === u._id ? (
                  <div className="flex items-center gap-2">
                    <select
                      value={newRole}
                      onChange={e => setNewRole(e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="analyst">Analyst</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button onClick={() => handleRoleUpdate(u._id)}
                      className="text-xs px-2 py-1 bg-black text-white rounded">
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)}
                      className="text-xs px-2 py-1 border border-gray-300 rounded">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <span className={`text-xs px-3 py-1 rounded-full capitalize ${roleColors[u.role] || "bg-gray-100 text-gray-700"}`}>
                    {u.role}
                  </span>
                )}

                {/* Edit/Delete — disabled for yourself */}
                {u._id !== currentUserId && (
                  <>
                    <button
                      onClick={() => { setEditingId(u._id); setNewRole(u.role) }}
                      className="text-sm px-2 py-1 hover:bg-gray-200 rounded">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="text-sm px-2 py-1 text-red-500 hover:bg-red-100 rounded">
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
    <div className="border border-gray-500/30 bg-white p-7 rounded-xl">
      <p className="text-sm text-gray-500 mb-10">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  )
}