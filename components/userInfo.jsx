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
    <div >
      <div className="flex">
      <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center font-semibold text-gray-50 text-sm flex-shrink-0">
                  {user.name?.[0]?.toUpperCase()}
                </div>
      <h2 className="font-medium ml-4 -mt-1">{user.name}
         <p className="bg-blue-500/40 px-3 py-1 rounded-2xl text-xs">{user.role.toUpperCase()}</p>
      </h2>
      </div>
     
    </div>
  )
}