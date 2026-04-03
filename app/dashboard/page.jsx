"use client"
import { useState, useEffect } from "react";
import BalanceChart from "@/components/balanceChart";
import RecentTransactions from "@/components/recentTransaction";
import { useRouter } from "next/navigation";
import Logout from "@/components/logout";
import { BarChart, Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  { month: "Jan", income: 8000, expense: 1200 },
  { month: "Feb", income: 10000, expense: 1500 },
  { month: "Mar", income: 12000, expense: 1800 },
  { month: "Apr", income: 11000, expense: 1600 },
  { month: "May", income: 14000, expense: 2000 },
  { month: "Jun", income: 16000, expense: 2200 },
];
const data2 = [
  { name: "Rent", value: 4000 },
  { name: "Utilities", value: 2000 },
  { name: "Supplies", value: 1500 },
  { name: "Software", value: 1000 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];


export default function DashboardPage() {


  const [user, setUser] = useState(null);
    const [role, setRole]               = useState(null)
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading]         = useState(true)
    const [search, setSearch]           = useState("")
    const [typeFilter, setTypeFilter]   = useState("all")
    const [sortOrder, setSortOrder]     = useState("newest")
    const [open, setOpen]               = useState(false)
    const router = useRouter()

useEffect(() => {
  const fetchUser = async () => {
    const res = await fetch("/api/me");
    const data = await res.json();
    setUser(data);
  };

  fetchUser();
}, []);
const fetchTransactions = async () => {
  setLoading(true)
  try {
    const res = await fetch("/api/transactions")
    if (!res.ok) return
    const data = await res.json()
    console.log(data) // check what API returns, remove after
    setTransactions(Array.isArray(data) ? data : data.transactions ?? [])
  } catch (err) {
    console.log("Error:", err)
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  fetchTransactions()
}, [])

    const totalIncome  = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0)
  const netBalance   = totalIncome - totalExpense
  const totaltransaction = transactions.length

  return (

<div >
  <div className="flex">
  <h1 className="font-bold text-3xl">Welcome back, {user?.name}</h1></div>
  <p className="text-md mt-2 text-gray-500">Here's your financial overview</p>
  <div className="grid grid-cols-4 gap-8 mt-10">
    <div className="w-full h-50 bg-white border border-gray-400/40 rounded-2xl p-7">
    <div className="flex justify-between"><p>Total Income</p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right w-4 h-4 text-green-600" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg></div>
    <div className="text-2xl font-bold mt-10">{`₹${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}</div>
    <p className="text-xs text-gray-500 mt-1">From all sources</p>
    <p className="font-bold text-green-600 mt-2 text-xs">+12% from last month</p>
    </div>
    <div className="w-full h-50 bg-white border border-gray-400/40 rounded-2xl p-7">
    <div className="flex justify-between"><p>Total Expenses</p><svg xmlns="http://www.w3.org/2000/svg" width="24" className="w-5 h-5 text-red-600 rotate-180" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg></div>
    <div className="text-2xl font-bold mt-10">{`₹${totalExpense.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}</div>
    <p className="text-xs text-gray-500 mt-1">Across all Categories</p>
    <p className="font-bold text-red-600 mt-2 text-xs">-5% from last month</p>
    </div>
    <div className="w-full h-50 bg-white border border-gray-400/40 rounded-2xl p-7">
    <div className="flex justify-between"><p>Net Balance</p>₹</div>
    <div className="text-2xl font-bold mt-10">{`₹${netBalance.toLocaleString("en-US",   { minimumFractionDigits: 2 })}`}</div>
    <p className="text-xs text-gray-500 mt-1">Net position</p>
    <p className="font-bold text-green-600 mt-2 text-xs">+8% from last month</p>
    </div>
    <div className="w-full h-50 bg-white border border-gray-400/40 rounded-2xl p-7">
    <div className="flex justify-between"><p>Transactions</p>💳</div>
    <div className="text-2xl font-bold mt-10">{totaltransaction}</div>
    <p className="text-xs text-gray-500 mt-1">This month</p>
    </div> 
  </div>
  <div className="flex gap-7 mt-7 mb-10">
    <div className="w-4/6 h-100 bg-white border border-gray-400/40 rounded-2xl"><div className="bg-white text-black p-6 rounded-2xl shadow-sm lg:col-span-2">
      
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Income vs Expenses</h2>
        <p className="text-sm text-gray-400">Monthly comparison</p>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            
            <XAxis dataKey="month" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            
            <Tooltip />
            <Legend />

            <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div></div>
    <div className="w-2/6 h-100 bg-white border border-gray-400/40 rounded-2xl"><div className="bg-white text-black rounded-2xl  p-6 shadow-sm">
      
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Expenses by Category</h2>
        <p className="text-sm text-gray-400">Distribution</p>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data2}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              innerRadius={60}   // 🔥 donut style
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div></div>
    

  </div>
  <BalanceChart/>
  <RecentTransactions/>
  <Logout/>
</div>
  );
}