"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e)=>{
    e.preventDefault(); 

    const res = await fetch("/api/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    });

    const data = await res.json();
    console.log("Login response:", res.status);

    if(res.ok){
      alert("login sucess");
      window.location.href = "/dashboard";
    }else{
      alert(data.message);
    }
    console.log(email, password)
  };
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      bro login here
      <form onSubmit={handleSubmit}>
      <input className='border border-violet-500 p-3 m-5' type="email" placeholder='write your email'
      value={email}
      onChange={(e)=>setEmail(e.target.value)} />
      <input className='border border-violet-500 p-3 m-5' type="password" placeholder='write your password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)} />
      <button type='submit' className='bg-black rounded-2xl text-white p-5 '>Submit</button>
      </form>
      <a className='text-blue-600' href="/signup">Signup</a>
    </div>
  )
}
