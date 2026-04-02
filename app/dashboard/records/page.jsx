"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddTransactionModal from "@/components/addTransaction";

export default function FinancialRecords() {

    const [role, setRole] = useState(null);
    const router = useRouter();
    const [open, setOpen] = useState(false);
  
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
    if (role === "viewer") {
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
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Financial Records
          </h1>
          <p className="text-muted-foreground mt-2">
            Add, edit, and manage your transactions
          </p>
        </div>

        <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-md bg-black text-white px-4 py-2 hover:bg-black/80">
          ➕ Add Transaction
          

        </button>
        <AddTransactionModal open={open} onClose={() => setOpen(false)} />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Income" value="$25,000.00" color="green" />
        <Card title="Total Expenses" value="$3,585.48" color="red" />
        <Card title="Net Balance" value="$21,414.52" color="green" />
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-xl border border-gray-400/30 p-6 space-y-4 shadow-sm">
        <h2 className="text-lg font-semibold">Filters & Search</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Search..."
            className="border border-gray-400/30 rounded-md px-3 py-2"
          />
          <select className="border border-gray-400/30 rounded-md px-3 py-2">
            <option>All Types</option>
            <option>Income</option>
            <option>Expense</option>
          </select>
          <select className="border border-gray-400/30 rounded-md px-3 py-2">
            <option>Date (Newest)</option>
            <option>Date (Oldest)</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-gray-400/30 shadow-sm p-6">
        <div className=" border-b border-gray-400/30">
          <h2 className="text-lg font-semibold">Transactions (8)</h2>
          <p className="text-sm text-gray-500 mb-5" >
            Showing 8 of 8 transactions
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-400/30">
              <tr className="text-sm text-gray-500">
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-left px-4">Category</th>
                <th className="text-left px-4">Date</th>
                <th className="text-right px-4">Amount</th>
                <th className="text-left px-4">Status</th>
              </tr>
            </thead>

            <tbody>
              <Row name="Office Supplies" type="Supplies" amount="-245.50" />
              <Row name="Client Payment" type="Income" amount="+5000" />
              <Row name="Software" type="Software" amount="-299" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Card({ title, value, color }) {
  return (
    <div className="bg-white border border-gray-400/30 rounded-xl p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2
        className={`text-2xl font-bold mt-9 ${
          color === "green" ? "text-green-600" : "text-red-600"
        }`}
      >
        {value}
      </h2>
    </div>
  );
}

function Row({ name, type, amount }) {
  return (
    <tr className="border-b border-gray-400/30 hover:bg-gray-50">
      <td className="py-3 px-4 font-medium">{name}</td>
      <td className="px-4 text-gray-500">{type}</td>
      <td className="px-4 text-gray-500">--</td>
      <td
        className={`px-4 text-right font-semibold ${
          amount.includes("-") ? "text-red-600" : "text-green-600"
        }`}
      >
        {amount}
      </td>
      <td className="px-4">
        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
          completed
        </span>
      </td>
    </tr>
  );
}