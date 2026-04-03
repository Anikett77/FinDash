"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const DEMO_ACCOUNTS = [
  { role: "Admin",   email: "admin@findash.com",   password: "admin123",   color: "bg-purple-100 text-purple-800",  dot: "bg-purple-500"  },
  { role: "Analyst", email: "analyst@findash.com", password: "analyst123", color: "bg-blue-100 text-blue-800",      dot: "bg-blue-500"    },
  { role: "Viewer",  email: "viewer@findash.com",  password: "viewer123",  color: "bg-gray-100 text-gray-700",      dot: "bg-gray-400"    },
]

export default function LoginPage() {
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/login", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email, password }),
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      window.location.href = "/dashboard"
    } else {
      setError(data.message || "Invalid credentials")
    }
  }

  // fill demo credentials on click
  const fillDemo = (account) => {
    setEmail(account.email)
    setPassword(account.password)
    setError("")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">

          <span className="text-2xl font-bold text-blue-950">FinDash</span>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-6">Sign in to your account to continue</p>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl flex items-center gap-2">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-800 transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-900 font-medium hover:underline">Sign up</a>
          </p>
        </div>

        {/* Demo accounts */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Demo Accounts — click to fill</p>
          <div className="flex flex-col gap-2">
            {DEMO_ACCOUNTS.map(acc => (
              <button key={acc.role} onClick={() => fillDemo(acc)}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors text-left w-full group">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${acc.dot}`} />
                  <div>
                    <p className="text-xs font-medium text-gray-800">{acc.email}</p>
                    <p className="text-xs text-gray-400">password: {acc.password}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${acc.color}`}>{acc.role}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}