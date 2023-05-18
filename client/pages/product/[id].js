import Header from '@/components/Header';
import ProductImages from '@/components/ProductImages';
import Wrapper from '@/components/Wrapper';
import { addToCart } from '@/helpers/use-apis/product';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProductPage = ({product}) => {

    const user = useSelector((state) => state?.user?.data?._id);
    const dispatch = useDispatch();


  return (
    <>
        <Header />
        <Wrapper>
            {/* <h2 className='font-roboto text-4xl gradient-text font-normal mt-4'>{product.title}</h2> */}
            <div className='grid grid-cols-[.7fr,1.3fr] gap-10 my-10'>
                <div className='bg-[#fff] rounded-[10px] p-7 border-black shadow-2xl h-[35rem]'>
                    <ProductImages images={product.images}/>
                </div>
                <div className='flex flex-col gap-2 rounded-[10px] p-7 h-fit border-black shadow-md'>
                    <h2 className='font-roboto text-4xl font-normal border-b p-1'>{product.title}</h2>
                    <p className='text-lg'>{product.description}</p>
                    <div className='flex items-center gap-2'>
                        <span className='text-lg font-medium'>&#x20B9;{product.price}/_</span>
                        <button className='btn-primary flex gap-1 bg-green-600 w-fit active:scale-[.9]'
                            onClick={()=>{
                                if(!user){
                                    return window.alert('Please login to add product to your cart');
                                }
                                dispatch(addToCart(product._id))
                            }}
                            >
                            Add to
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    </>
  );
}

export default ProductPage;


export const getServerSideProps = async (appCtx) => {
    const productId = appCtx.params.id;
    const product = await axios.get(`http://localhost:5000/products/${productId}`);
    return {
      props: {
        product: JSON.parse(JSON.stringify(product?.data))
      }
    }
}