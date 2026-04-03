"use client";

export default function Logout() {
  const handleLogout = async () => {
    await fetch("/api/logout");
    window.location.href = "/login";
  };

  return <button className='text-black bottom-8 font-medium ml-5 absolute border border-gray-400/30 w-3/4 py-1.5 rounded-lg text-center hover:bg-red-500/50' onClick={handleLogout}>Logout</button>;
}