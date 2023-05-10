import Layout from "@/components/Layout"
import React from "react"
import { useSession } from "next-auth/react"



export default function Home() {

  const { data: session } = useSession();
  // console.log('session',session);
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h2 className="font-normal text-black/[.8]">Hello, {session?.user?.name}</h2>
        <div className="flex gap-1 items-center font-medium bg-black/[.3] text-black/[.8] pr-2 rounded-full rounded-tr-none">
          <img className="h-9 rounded-full" src={session?.user?.image} />
          {session?.user?.name}
        </div>
      </div>
    </Layout>
  )
}


