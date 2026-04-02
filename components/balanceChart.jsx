"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", balance: 6000 },
  { month: "Feb", balance: 8000 },
  { month: "Mar", balance: 10000 },
  { month: "Apr", balance: 9000 },
  { month: "May", balance: 12000 },
  { month: "Jun", balance: 14000 },
];

export default function BalanceChart() {
  return (
    <div className="bg-white text-black rounded-xl border border-gray-400/20 p-6 shadow-sm">
      
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Balance Trend</h2>
        <p className="text-sm text-gray-400">
          Your net balance over the last 6 months
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />

            <XAxis dataKey="month" stroke="#aaa" />
            <YAxis stroke="#aaa" />

            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="balance"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}