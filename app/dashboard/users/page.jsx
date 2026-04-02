"use client"
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const users = [
  {
    name: "Alex Admin",
    email: "admin@example.com",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  },
  {
    name: "Emma Data Analyst",
    email: "emma@example.com",
    role: "Viewer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
  },
  {
    name: "John Viewer",
    email: "viewer@example.com",
    role: "Viewer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=viewer",
  },
  {
    name: "Robert Finance Manager",
    email: "robert@example.com",
    role: "Analyst",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
  },
  {
    name: "Sarah Analyst",
    email: "analyst@example.com",
    role: "Analyst",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=analyst",
  },
];

const roleColors = {
  Admin: "bg-purple-100 text-purple-800",
  Analyst: "bg-blue-100 text-blue-800",
  Viewer: "bg-gray-100 text-gray-800",
};

export default function UserManagement() {



  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");

        if (!res.ok) {
          console.log("Not authorized");
          return;
        }

        const data = await res.json();
        setRole(data.role);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchUser();
  }, []);

  // ⏳ loading state
  if (role === null) return <p className="p-4">Loading...</p>;

  // those who arent
  if (role === "viewer" || role === "analyst") {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-2">Access Denied 🚫</h1>
          <p>You are not allowed to view analytics</p>

          <button
            onClick={() => router.push("/dashboard")}
            className="mt-4 bg-black text-white px-4 py-2"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="p-4 md:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-500 mt-2">
            Manage team members and permissions
          </p>
        </div>

        <button className="bg-black text-white px-4 py-2 rounded-md">
          + Add User
        </button>
      </div>

      {/* Role Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { role: "Viewer", desc: "Read-only access. Can view financial records and analytics but cannot add, edit, or delete data." },
          { role: "Analyst", desc: "Full data access. Can add, edit, and view transactions and analytics." },
          { role: "Admin", desc: "Full system access. Can manage users, assign roles, and delete transactions." },
        ].map((item, i) => (
          <div key={i} className="border border-gray-500/30 bg-white p-6 rounded-xl shadow-sm">
            <span className="text-xs px-2 py-1 rounded bg-gray-200">
              {item.role}
            </span>
            <p className="text-xs text-gray-500 mt-12">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Stat title="Total Users" value="5" />
        <Stat title="Admins" value="1" />
        <Stat title="Analysts" value="2" />
        <Stat title="Viewers" value="2" />
      </div>

      {/* Filters */}
      <div className="border border-gray-500/30 bg-white rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Filters & Search</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="border border-gray-500/30 bg-white p-2 rounded-md w-full"
          />

          <select className="border border-gray-500/30 bg-white p-2 rounded-md">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Analyst</option>
            <option>Viewer</option>
          </select>
        </div>
      </div>

      {/* User List */}
      <div className="border border-gray-500/30 bg-white rounded-xl p-7 space-y-3">
        <h2 className="font-semibold">Users ({users.length})</h2>

        {users.map((user, index) => (
          <div
            key={index}
            className="flex justify-between items-center border border-gray-500/30 bg-white p-3 rounded-lg hover:bg-gray-50"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt=""
                className="w-10 h-10 rounded-full"
              />

              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-3 py-1 rounded-full ${roleColors[user.role]}`}
              >
                {user.role}
              </span>

              <button className="text-sm px-2 py-1 hover:bg-gray-200 rounded">
                Edit
              </button>

              <button className="text-sm px-2 py-1 text-red-500 hover:bg-red-100 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Small reusable stat component */
function Stat({ title, value }) {
  return (
    <div className="border border-gray-500/30 bg-white p-7 rounded-xl">
      <p className="text-sm text-gray-500 mb-10">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}