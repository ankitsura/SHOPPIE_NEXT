import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

import Nav from './Nav'; 
//aaa

const Layout = ({children}) => {
        
    const { data: session } = useSession();
    
    if (!session) {
    return (
    <div className='bg-blue-900 w-screen h-screen flex items-center'>
        <div className='text-center w-full'>
            <button className='bg-white p-2 px-4 rounded-lg active:scale-[97%]'
            onClick={() => signIn('google' , {
                redirect: true,
                callbackUrl: '/'
            })}
            >
            Login With Google
            </button>
        </div>
    </div>
    )}
    return (
    <>
        <div className='bg-black/80 min-h-screen flex'>
            <Nav/>
            <div className='bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>
                {children}
            </div>
        </div>
    </>
    )
}

export default Layout;
