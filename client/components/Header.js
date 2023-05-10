import Link from "next/link"
import { useSelector } from "react-redux";

export const Header = () => {

    const cartItems = useSelector((state) => state.cart);

    return (
        <header className="flex justify-center items-center text-lg p-4 bg-[#222] text-white">
            <Link className="font-roboto text-3xl pl-4 flex-1" href={'/'}>Shoppie</Link>
            <nav className="flex flex-[5] justify-end pr-4 gap-8">
                <Link href={'/'}>Home</Link>
                <Link href={'/products'}>Products</Link>
                <Link href={'/categories'}>Categories</Link>
                <Link href={'/account'}>Account</Link>
                <Link href={'/cart'}>Cart ({cartItems?.length})</Link>
            </nav>
        </header>
    )
}

export default Header;