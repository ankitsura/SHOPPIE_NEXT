import Layout from "@/components/Layout"
import React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"



export default function Home() {

  const router = useRouter();

// const user = localStorage.getItem('token')
//   if(!user){
//     router.push('/auth');
//   }



  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h2 className="font-normal text-black/[.8]">Hello, Admin</h2>
        <div className="flex gap-1 items-center font-medium bg-black/[.3] text-black/[.8] pr-2 rounded-full rounded-tr-none">
          <img className="h-9 rounded-full" src='' alt="img"/>
          Admin
        </div>
      </div>
    </Layout>
  )
}


