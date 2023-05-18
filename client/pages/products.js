import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Wrapper from '@/components/Wrapper';
import axios from 'axios';
import React from 'react';

const ProductsPage = ({allProducts}) => {
    console.log(allProducts);
  return (
    <>
      <Header />
      <Wrapper>
      <h2 className='font-roboto text-4xl gradient-text font-normal shadow-sm'>All Products</h2>
      <div className='grid grid-cols-[1fr,1fr,1fr,1fr] gap-5 my-5'>
        {
            allProducts.map((product) => (
                <ProductCard key={product._id} {...product} />
            ))
        }
        </div>
      </Wrapper>
    </>
  );
}

export default ProductsPage;

export const getServerSideProps = async () => {
    const allProducts = await axios.get('http://localhost:5000/products');
    return {
      props: {
        allProducts: JSON.parse(JSON.stringify(allProducts?.data))
      }
    }
}
