"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function UserInfo() {
const [user, setUser] = useState(null);

  useEffect(()=>{
    const fetchUser = async () =>{
      try {
        const res = await axios.get("/api/me");
        setUser(res.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchUser();
  }, []);
  if(!user) return <p>Loading...</p>

  return(
    <div>
      <h2>{user.name}
      </h2>
      <p className="bg-blue-500/40 px-2 rounded-2xl">{user.role}</p>
    </div>
  )
}