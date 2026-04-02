"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";



const COLORS = ["#8b5cf6", "#10b981", "#ef4444", "#3b82f6", "#f59e0b"];

// Sample Data
const balanceData = [
  { month: "Jan", balance: 4000 },
  { month: "Feb", balance: 5500 },
  { month: "Mar", balance: 7000 },
  { month: "Apr", balance: 6500 },
  { month: "May", balance: 9000 },
  { month: "Jun", balance: 11000 },
];

const categoryData = [
  { name: "Supplies", value: 245 },
  { name: "Software", value: 299 },
  { name: "Rent", value: 2500 },
  { name: "Utilities", value: 540 },
];

const typeData = [
  { name: "Income", value: 3 },
  { name: "Expense", value: 5 },
];

const statusData = [
  { name: "completed", value: 7 },
  { name: "pending", value: 1 },
];


export default function AnalyticsPage() {
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

  // those who are allowed to access


  return (
    <div className="space-y-6 w-full">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground text-gray-500 mt-2">
            Detailed financial insights and trends
          </p>
        </div>
        <span className="bg-secondary text-xs px-2 py-1 rounded-md">
          ADMIN · 8 transactions analyzed
        </span>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard title="Total Transactions" value="8" />
        <StatCard title="Total Income" value="$25,000" green />
        <StatCard title="Total Expenses" value="$3,585" red />
        <StatCard title="Avg Transaction" value="$3,573" />
        <StatCard title="Completed" value="7" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BALANCE TREND */}
        <Card>
          <CardHeader>
            <CardTitle>Balance Trend</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
<CardContent>
  <div className="w-full h-[300px] min-w-0">
    <ResponsiveContainer width="100%" height="100%">
              <LineChart data={balanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer >
            </div>
          </CardContent>
        </Card>

        {/* CATEGORY PIE */}
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>Distribution</CardDescription>
          </CardHeader>
<CardContent>
  <div className="w-full h-[300px] min-w-0">
    <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="value" label>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* TRANSACTION TYPE */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Types</CardTitle>
          </CardHeader>
<CardContent>
  <div className="w-full h-[300px] min-w-0">
    <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={typeData} dataKey="value" label>
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* STATUS BAR */}
        <Card>
          <CardHeader>
            <CardTitle>Status Overview</CardTitle>
          </CardHeader>
<CardContent>
  <div className="w-full h-[300px] min-w-0">
    <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead className="border-b border-gray-400/30">
              <tr className="text-sm text-muted-foreground">
                <th className="text-left py-2">Category</th>
                <th className="text-right">Count</th>
                <th className="text-right">Total</th>
                <th className="text-right">Average</th>
              </tr>
            </thead>
            <tbody>
              <Row name="Supplies" count={1} total="$245" avg="$245" />
              <Row name="Income" count={3} total="$25,000" avg="$8,333" />
              <Row name="Software" count={1} total="$299" avg="$299" />
              <Row name="Rent" count={1} total="$2,500" avg="$2,500" />
              <Row name="Utilities" count={2} total="$540" avg="$270" />
            </tbody>
          </table>
        </CardContent>
      </Card>

    </div>
  );
}

/* COMPONENTS */

function StatCard({ title, value, green, red }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold ${
            green ? "text-green-600" : red ? "text-red-600" : ""
          }`}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ name, count, total, avg }) {
  return (
    <tr className="border-b hover:bg-muted/50">
      <td className="py-2 font-medium">{name}</td>
      <td className="text-right">{count}</td>
      <td className="text-right font-semibold">{total}</td>
      <td className="text-right text-muted-foreground">{avg}</td>
    </tr>

  );
}