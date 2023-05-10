import React from 'react';
import Wrapper from './Wrapper';
import ProductCard from './ProductCard';

const NewProducts = ({newProducts}) => {
    console.log('newProducts',newProducts);
  return (
    <Wrapper>
        <div className='mt-3'>
            <h2 className='font-roboto text-5xl gradient-text font-normal shadow-sm'>New Arrivals</h2>
        </div>
        <div className='grid grid-cols-[1fr,1fr,1fr,1fr] gap-5 my-5'>
        {
            newProducts.map((product) => (
                <ProductCard key={product._id} {...product} />
            ))
        }
        </div>
    </Wrapper>
  );
}

export default NewProducts;
