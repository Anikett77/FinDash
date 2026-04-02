"use client";

export default function Logout() {
  const handleLogout = async () => {
    await fetch("/api/logout");
    window.location.href = "/login";
  };

  return <button className='text-black -bottom-30 absolute border border-gray-400/30 w-3/4 py-1.5 rounded-lg text-center' onClick={handleLogout}>Logout</button>;
}