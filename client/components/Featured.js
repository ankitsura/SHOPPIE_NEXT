import React, { useContext } from 'react';
import Wrapper from './Wrapper';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/helpers/use-apis/product';

const Featured = ({product}) => {
    const dispatch = useDispatch();

  return (
    <div className='bg-[#222] text-[#fff]'>
        <Wrapper>
            <div className='py-10'>
                <div className='grid grid-cols-[1fr,1fr] gap-10'>
                    <div>
                        <h1 className='text-3xl mb-2'>{product.title}</h1>
                        <p className=' text-[#aaa] text-[.9rem]'>{product.description}</p>
                        <div className='flex gap-2 mt-5'>
                            <Link href={`/products/${product._id}`} className='bg-transparent border-y-[1px] border-0 text-[#fff] rounded-[5px] py-[5px] px-[15px]'>Read More</Link>
                            <button className='btn-primary flex gap-1'
                            onClick={()=>dispatch(addToCart(product._id))}
                            >
                            Add to
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            </button>
                        </div>
                    </div>
                    <div className=''>
                        <img className='m-auto rounded-md h-72 w-auto' src={product.images[0]} alt="Mac" />
                    </div>
                </div>
            </div>
        </Wrapper>
    </div>
  );
}

export default Featured;
