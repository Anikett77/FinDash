"use client";

const transactions = [
  {
    title: "Office Supplies",
    category: "Supplies",
    date: "2024-03-20",
    amount: -245.5,
    status: "completed",
  },
  {
    title: "Client Invoice Payment",
    category: "Income",
    date: "2024-03-19",
    amount: 5000,
    status: "completed",
  },
  {
    title: "Software License",
    category: "Software",
    date: "2024-03-18",
    amount: -299.99,
    status: "completed",
  },
  {
    title: "Rent Payment",
    category: "Rent",
    date: "2024-03-17",
    amount: -2500,
    status: "completed",
  },
  {
    title: "Consulting Revenue",
    category: "Income",
    date: "2024-03-16",
    amount: 8000,
    status: "completed",
  },
];

export default function RecentTransactions() {
  return (
    <div className="bg-white text-black rounded-xl border border-gray-400/20 p-6 shadow-sm mt-10">
      
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <p className="text-sm text-gray-400">
          Your latest financial activity
        </p>
      </div>

      {/* List */}
      <div className="space-y-4">
        {transactions.map((tx, index) => {
          const isIncome = tx.amount > 0;

          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-800/20 rounded-lg hover:bg-gray-400/40 transition"
            >
              {/* Left */}
              <div>
                <p className="font-medium">{tx.title}</p>
                <p className="text-sm text-gray-400">
                  {tx.category} • {tx.date}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                
                {/* Amount */}
                <span
                  className={`text-sm font-semibold ${
                    isIncome ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isIncome ? "+" : "-"}₹{Math.abs(tx.amount)}
                </span>

                {/* Status */}
                <span className="text-xs px-2 py-1 rounded-full bg-green-900 text-green-300">
                  {tx.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}