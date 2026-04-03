"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const ROLES = [
  { value: "viewer",  label: "Viewer",  desc: "Read-only access to dashboard",         color: "border-gray-300 bg-gray-50",          active: "border-blue-900 bg-blue-50", dot: "bg-gray-400"   },
  { value: "analyst", label: "Analyst", desc: "View records and analytics",             color: "border-gray-300 bg-gray-50",          active: "border-blue-900 bg-blue-50", dot: "bg-blue-500"   },
  { value: "admin",   label: "Admin",   desc: "Full access — manage records and users", color: "border-gray-300 bg-gray-50",          active: "border-blue-900 bg-blue-50", dot: "bg-purple-500" },
]

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm]       = useState({ name: "", email: "", password: "", role: "viewer" })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSignup = async () => {
    setLoading(true)
    setError("")

    try {
      const res  = await fetch("/api/signup", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Signup failed")
      } else {
        setSuccess(true)
        setTimeout(() => router.push("/login"), 1500)
      }
    } catch {
      setError("Something went wrong. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">

          <span className="text-2xl font-bold text-blue-950">FinDash</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Create account</h1>
          <p className="text-sm text-gray-500 mb-6">Fill in your details to get started</p>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl flex items-center gap-2">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
              </svg>
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl flex items-center gap-2">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
              Account created! Redirecting to login...
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input name="name" placeholder="John Doe" onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input name="email" placeholder="you@example.com" onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input name="password" type="password" placeholder="••••••••" onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition" />
            </div>

            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
              <div className="flex flex-col gap-2">
                {ROLES.map(r => (
                  <button key={r.value} type="button" onClick={() => setForm({ ...form, role: r.value })}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${form.role === r.value ? r.active + ' border-2' : r.color}`}>
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${r.dot}`} />
                    <div>
                      <p className={`text-sm font-medium ${form.role === r.value ? 'text-blue-900' : 'text-gray-800'}`}>{r.label}</p>
                      <p className="text-xs text-gray-500">{r.desc}</p>
                    </div>
                    {form.role === r.value && (
                      <svg className="ml-auto flex-shrink-0" width="16" height="16" fill="none" stroke="#1e3a8a" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleSignup} disabled={loading || success}
              className="w-full bg-blue-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-800 transition-colors disabled:opacity-60 mt-2">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-blue-900 font-medium hover:underline">Sign in</a>
          </p>
        </div>

      </div>
    </div>
  )
}