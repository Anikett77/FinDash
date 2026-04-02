export default function FinancialRecords() {
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

        <button className="flex items-center gap-2 rounded-md bg-black text-white px-4 py-2 hover:bg-black/80">
          ➕ Add Transaction
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Income" value="$25,000.00" color="green" />
        <Card title="Total Expenses" value="$3,585.48" color="red" />
        <Card title="Net Balance" value="$21,414.52" color="green" />
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-xl border p-6 space-y-4 shadow-sm">
        <h2 className="text-lg font-semibold">Filters & Search</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Search..."
            className="border rounded-md px-3 py-2"
          />
          <select className="border rounded-md px-3 py-2">
            <option>All Types</option>
            <option>Income</option>
            <option>Expense</option>
          </select>
          <select className="border rounded-md px-3 py-2">
            <option>Date (Newest)</option>
            <option>Date (Oldest)</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Transactions (8)</h2>
          <p className="text-sm text-gray-500">
            Showing 8 of 8 transactions
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
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
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2
        className={`text-2xl font-bold ${
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
    <tr className="border-b hover:bg-gray-50">
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