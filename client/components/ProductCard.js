import { addToCart } from '@/helpers/use-apis/product';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

const ProductCard = ({_id, title, description, price, images}) => {

    const url = `/product/${_id}`
    const dispatch = useDispatch();

  return (
    <div>
        <Link href={url} className='bg-[#fff] p-3 flex justify-center rounded-md'>
            <img className='max-w-[100%] h-[170px]' src={images[0]} alt="" />
        </Link>
        <Link href={url} className='text-base font-medium text-black/[.9] mt-1 p-1'>
            {title}
        </Link>
        <div className='px-1 font-medium text-lg flex items-center justify-between'>
        &#x20B9; {price}.00
            <button
            className='flex gap-1 min-w-fit border-slate-700 border px-1 rounded-md text-blue-500/[.8]'
            onClick={()=>dispatch(addToCart(_id))}
            >
            Add to
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            </button>
        </div>
    </div>
  );
}

export default ProductCard;
