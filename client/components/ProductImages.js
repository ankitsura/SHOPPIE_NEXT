import React, { useState } from 'react';

const ProductImages = ({images}) => {

    const [activeImage, setActiveImage] = useState(images?.[0])

  return (
    <>
      <img className='m-auto max-w-full h-[70%]' src={activeImage} alt="img" />
      <div className='flex justify-center gap-1 mt-4 max-h-[30%]'>
        {
            images.map((img)=>(
                <div key={img} onClick={()=>setActiveImage(img)} className={`max-h-full flex items-center justify-center p-1 border-x border-y cursor-pointer rounded-lg ${img === activeImage ? 'shadow-lg bg-slate-200' : 'bg-slate-100 shadow-sm opacity-[.8]'}`}>
                    <img className='max-w-full max-h-full' src={img} alt="img" />
                </div>
            ))
        }
      </div>
    </>
  );
}

export default ProductImages;
