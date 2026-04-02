"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="flex justify-between p-4 border">
      <div className="space-x-4">
        <button onClick={() => router.push("/dashboard")}>Dashboard</button>
        <button onClick={() => router.push("/transactions")}>Transactions</button>
      </div>
    </div>
  );
}