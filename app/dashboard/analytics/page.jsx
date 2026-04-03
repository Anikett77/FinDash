"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent,
} from "@/components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid,
} from "recharts";

const COLORS = ["#8b5cf6", "#10b981", "#ef4444", "#3b82f6", "#f59e0b", "#ec4899"];

export default function AnalyticsPage() {
  const [role, setRole]                 = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]           = useState(true);
  const router = useRouter();

  // fetch role
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) return;
        const data = await res.json();
        setRole(data.role);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchUser();
  }, []);

  // fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/transactions");
        if (!res.ok) return;
        const data = await res.json();
        setTransactions(Array.isArray(data) ? data : data.transactions ?? []);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // ── Computed stats ────────────────────────────────────────────────────────
  const totalIncome     = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense    = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const netBalance      = totalIncome - totalExpense;
  const totalTransactions = transactions.length;
  const completedCount  = transactions.filter(t => t.status === "completed").length;

  // ── Chart data built from real transactions ───────────────────────────────

  // 1. Balance trend — group by month
  const balanceByMonth = {};
  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString("en-US", { month: "short" });
    if (!balanceByMonth[month]) balanceByMonth[month] = 0;
    balanceByMonth[month] += t.type === "income" ? t.amount : -t.amount;
  });
  const balanceData = Object.entries(balanceByMonth).map(([month, balance]) => ({ month, balance: Math.round(balance) }));

  // 2. Category pie — expenses only
  const categoryMap = {};
  transactions.filter(t => t.type === "expense" || "income").forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });
  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value: Math.round(value) }));

  // 3. Transaction type pie
  const typeData = [
    { name: "Income",  value: transactions.filter(t => t.type === "income").length  },
    { name: "Expense", value: transactions.filter(t => t.type === "expense").length },
  ];

  // 4. Status bar chart
  const statusMap = {};
  transactions.forEach(t => {
    statusMap[t.status] = (statusMap[t.status] || 0) + 1;
  });
  const statusData = Object.entries(statusMap).map(([name, value]) => ({ name, value }));

  // 5. Category details table
  const categoryDetails = {};
  transactions.forEach(t => {
    if (!categoryDetails[t.category]) categoryDetails[t.category] = { count: 0, total: 0 };
    categoryDetails[t.category].count += 1;
    categoryDetails[t.category].total += t.amount;
  });

  // ── Access control ────────────────────────────────────────────────────────
  if (role === null) return <p className="p-4">Loading...</p>;

  if (role === "viewer") {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-2">Access Denied 🚫</h1>
          <p>You are not allowed to view analytics</p>
          <button onClick={() => router.push("/dashboard")} className="mt-4 bg-black text-white px-4 py-2">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-500 mt-2">Detailed financial insights and trends</p>
        </div>
        <span className="bg-gray-100 text-xs px-2 py-1 rounded-md uppercase">
          {role} · {totalTransactions} transactions analyzed
        </span>
      </div>

      {/* STATS — grid-cols-5 */}
      <div className="grid grid-cols-5 gap-4 mt-10">

        <div className="w-full bg-white border border-gray-400/40 rounded-2xl p-7">
          <div className="flex justify-between"><p>Total Transactions</p><span>💳</span></div>
          <div className="text-2xl font-bold mt-10">{totalTransactions}</div>
          <p className="text-xs text-gray-500 mt-1">All records</p>
        </div>

        <div className="w-full bg-white border border-gray-400/40 rounded-2xl p-7">
          <div className="flex justify-between"><p>Total Income</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-600"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </div>
          <div className="text-2xl font-bold mt-10">₹{totalIncome.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
          <p className="text-xs text-gray-500 mt-1">From all sources</p>
          <p className="font-bold text-green-600 mt-2 text-xs">+12% from last month</p>
        </div>

        <div className="w-full bg-white border border-gray-400/40 rounded-2xl p-7">
          <div className="flex justify-between"><p>Total Expenses</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-red-600 rotate-180"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </div>
          <div className="text-2xl font-bold mt-10">₹{totalExpense.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
          <p className="text-xs text-gray-500 mt-1">Across all categories</p>
          <p className="font-bold text-red-600 mt-2 text-xs">-5% from last month</p>
        </div>

        <div className="w-full bg-white border border-gray-400/40 rounded-2xl p-7">
          <div className="flex justify-between"><p>Net Balance</p><span>₹</span></div>
          <div className={`text-2xl font-bold mt-10 ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
            ₹{netBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-gray-500 mt-1">Net position</p>
          <p className="font-bold text-green-600 mt-2 text-xs">+8% from last month</p>
        </div>

        <div className="w-full bg-white border border-gray-400/40 rounded-2xl p-7">
          <div className="flex justify-between"><p>Completed</p><span>✅</span></div>
          <div className="text-2xl font-bold mt-10">{completedCount}</div>
          <p className="text-xs text-gray-500 mt-1">of {totalTransactions} transactions</p>
          <p className="font-bold text-green-600 mt-2 text-xs">
            {totalTransactions > 0 ? Math.round((completedCount / totalTransactions) * 100) : 0}% completion rate
          </p>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BALANCE TREND — real data */}
        <Card>
          <CardHeader>
            <CardTitle>Balance Trend</CardTitle>
            <CardDescription>Net balance grouped by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={balanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                  <Line type="monotone" dataKey="balance" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* CATEGORY PIE — real data */}
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>Distribution of spending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* TRANSACTION TYPE PIE — real data */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Types</CardTitle>
            <CardDescription>Income vs Expense count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={typeData} dataKey="value" nameKey="name" label={({ name, value }) => `${name}: ${value}`}>
                    <Cell fill="#10b981" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* STATUS BAR — real data */}
        <Card>
          <CardHeader>
            <CardTitle>Status Overview</CardTitle>
            <CardDescription>Transactions by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* CATEGORY DETAILS TABLE — real data */}
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>Breakdown per category from DB</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : (
            <table className="w-full">
              <thead className="border-b border-gray-400/30">
                <tr className="text-sm text-gray-500">
                  <th className="text-left py-2">Category</th>
                  <th className="text-right">Count</th>
                  <th className="text-right">Total</th>
                  <th className="text-right">Average</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(categoryDetails).map(([name, { count, total }]) => (
                  <tr key={name} className="border-b border-gray-400/30 hover:bg-gray-50">
                    <td className="py-2 font-medium">{name}</td>
                    <td className="text-right">{count}</td>
                    <td className="text-right font-semibold">₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="text-right text-gray-500">₹{(total / count).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

    </div>
  );
}