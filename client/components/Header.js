import jwtDecode from "jwt-decode";
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {

    
    const dispatch = useDispatch();
    const router = useRouter();
    
    const cartItems = useSelector((state) => state?.user?.data?.cartItems);
    const user = useSelector((state) => state?.user?.data?._id);
    
    useEffect(()=>{
        if(typeof window !== undefined){
            const token = localStorage?.getItem('token');
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken.exp * 1000 < new Date().getTime()){
                    dispatch({type: 'LOGOUT'})
                }
            }
        }
    });

    return (
        <header id="header" className="flex justify-center items-center text-lg p-4 bg-[#222] text-white">
            <Link className="font-roboto text-3xl pl-4 flex-1" href={'/'}>Shoppie</Link>
            <nav className="flex flex-[5] justify-end pr-4 gap-8">
                <Link href={'/'}>Home</Link>
                <Link href={'/products'}>Products</Link>
                {/* <Link href={'/categories'}>Categories</Link>
                <Link href={'/account'}>Account</Link> */}
                <Link href={'/cart'}>Cart ({cartItems?.filter((value,index,array)=>array.indexOf(value)===index).length})</Link>
                {
                    user ?
                    <button onClick={()=>{
                        dispatch({type: 'LOGOUT'})
                        router.push('/auth')
                    }}>
                    Logout
                    </button>
                    :
                    <Link href={'/auth'}>Login</Link>
                }
            </nav>
        </header>
    )
}

export default Header;