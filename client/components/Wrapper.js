import React from 'react';

const Wrapper = ({children}) => {

  return (
    <div className='px-2 m-auto max-w-[1800px]'>
        {children}
    </div>
  );
}

export default Wrapper;
