// import React, { createContext, useEffect, useState } from 'react';

// export const CartContext = createContext({});

// const CartContextProvider = ({children}) => {

//     const ls = typeof window !== 'undefined' ? window.localStorage : null;

//     const [cartItems, setCartItems] = useState([]);

//     const addProduct = (productId) => {
//         setCartItems(prev => [...prev, productId])
//     }

//     useEffect(() => {
//         if(cartItems?.length > 0){
//             ls?.setItem('cart', JSON.stringify(cartItems));
//         }
//     },[cartItems])

//     useEffect(() => {
//         if(ls && ls.getItem('cart')){
//             setCartItems(JSON.parse(ls.getItem('cart')))
//         }
//     },[])

//   return (
//     <CartContext.Provider value={{cartItems, addProduct}}>
//         {children}
//     </CartContext.Provider>
//   );
// }

// export default CartContextProvider;
