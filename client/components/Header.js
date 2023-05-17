import Link from "next/link"
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const cartItems = useSelector((state) => state?.user?.data?.cartItems);
    const user = useSelector((state) => state?.user?.data?._id);

    const handleLog = () => {
        if(user){
            dispatch({type: 'LOGOUT', router});
        } else {
            router.push('/auth');
        }
    }

    return (
        <header id="header" className="flex justify-center items-center text-lg p-4 bg-[#222] text-white">
            <Link className="font-roboto text-3xl pl-4 flex-1" href={'/'}>Shoppie</Link>
            <nav className="flex flex-[5] justify-end pr-4 gap-8">
                <Link href={'/'}>Home</Link>
                <Link href={'/products'}>Products</Link>
                <Link href={'/categories'}>Categories</Link>
                <Link href={'/account'}>Account</Link>
                <Link href={'/cart'}>Cart ({cartItems?.length})</Link>
                <button onClick={handleLog}>{user ? 'Logout' : 'Login'}</button>
            </nav>
        </header>
    )
}

export default Header;