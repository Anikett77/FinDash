import React from "react";

const activities = [
  {
    title: "View Dashboard",
    desc: "Accessed main dashboard",
    time: "9:26:38 PM",
    date: "4/2/2026",
  },
  {
    title: "View Records",
    desc: "Viewed financial records",
    time: "10:26:38 PM",
    date: "4/2/2026",
  },
  {
    title: "View Analytics",
    desc: "Accessed analytics dashboard",
    time: "10:56:38 PM",
    date: "4/2/2026",
  },
  {
    title: "Add Transaction",
    desc: "Created new transaction record",
    time: "11:11:38 PM",
    date: "4/2/2026",
  },
  {
    title: "Manage User",
    desc: "Updated user role",
    time: "11:21:38 PM",
    date: "4/2/2026",
  },
];

export default function ActivityLog() {
  return (
    <div className="p-4 md:p-8 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Activity Log</h1>
        <p className="text-gray-500 mt-2">
          Track your system activities and actions
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Stat title="Total Records" value="8" sub="Financial transactions" />
        <Stat title="System Users" value="5" sub="Total users in system" />
        <Stat title="Your Role" value="Admin" sub="Current permissions level" />
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="font-semibold text-blue-800">Activity Tracking</p>
        <p className="text-sm text-blue-700 mt-1">
          This log shows actions you can perform based on your role (admin).
        </p>
      </div>

      {/* Activity List */}
      <div className="border border-gray-400/30 bg-white rounded-xl p-7 space-y-3">
        <h2 className="font-semibold">Recent Activity</h2>
        <p className="text-gray-500 -mt-3 mb-6">
          Your recent actions in the system
        </p>

        {activities.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center border border-gray-400/40 p-3 rounded-lg hover:bg-gray-50"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium">{item.time}</p>
              <p className="text-xs text-gray-500">{item.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions */}
      <div className="border border-gray-400/30 bg-white rounded-xl p-6">
        <h2 className="font-semibold mb-4">What You Can Do</h2>

        <ul className="space-y-2 text-sm text-gray-600">
          <li>✔ Manage all transactions</li>
          <li>✔ Add and delete transactions</li>
          <li>✔ Manage all users</li>
          <li>✔ Assign and revoke roles</li>
          <li>✔ Access analytics</li>
          <li>✔ System administration</li>
        </ul>
      </div>
    </div>
  );
}

/* Reusable Stat */
function Stat({ title, value, sub }) {
  return (
    <div className="border border-gray-500/30 bg-white p-6 rounded-xl">
      <p className="text-sm text-gray-500 mb-8">{title}</p>
      <h2 className="text-2xl font-bold capitalize">{value}</h2>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  );
}