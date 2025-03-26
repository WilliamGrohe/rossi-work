'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard(){
  const router = useRouter();
  const [onLoad, setOnLoad] = useState(true);

  function handleLogOut() {
    console.log("logout")
    setOnLoad(true)
    localStorage.removeItem("token")
    router.push("/login")
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    setOnLoad(false)
  }, 
  [router]);

  if (onLoad) {
    return <div>Carregando...</div>;
  }


  return (
    <div className="">
      <h1>Bem-vindo ao Dashboard</h1>
      <button onClick={handleLogOut}>Logout</button>
      </div>
      )
}