"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer"
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "Signup failed");
      } else {
        setMsg("Signup successful 🎉");
        setTimeout(() => router.push("/login"), 1000);
      }
    } catch (err) {
      setMsg("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border p-6 rounded w-80">
        <h2 className="text-xl mb-4 text-center">Signup</h2>

        <input
          name="name"
          placeholder="Name"
          className="border w-full p-2 mb-2"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="border w-full p-2 mb-2"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

        {/* Role Dropdown */}
        <select
          name="role"
          className="border w-full p-2 mb-4"
          onChange={handleChange}
          value={form.role}
        >
          <option value="viewer">Viewer</option>
          <option value="analyst">Analyst</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleSignup}
          className="bg-black text-white w-full p-2"
          disabled={loading}
        >
          {loading ? "Creating..." : "Signup"}
        </button>

        {msg && <p className="mt-3 text-sm text-center">{msg}</p>}
      </div>
    </div>
  );
}