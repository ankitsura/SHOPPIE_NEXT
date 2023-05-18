import Header from '@/components/Header';
import Wrapper from '@/components/Wrapper';
import { paymentCanceled, paymentSuccess, placeOrder } from '@/helpers/use-apis/checkout';
import { addToCart, fetchCartItems, removeFromCart } from '@/helpers/use-apis/product';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((state) => state?.user?.data?.cartItems)
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({name:'', email:'', city:'', pincode:'', address:'', country:'', landmark:'', orders: cartItems});
  const [order, setOrder] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  
  const checkout = (e) => {
    e.preventDefault();
    dispatch(placeOrder(formData)).then((data)=>{
      window.open(data.url);
    });
  }
  
  useEffect(()=>{
    if(window.location.href.includes('success')){
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('orderId').toString();
      dispatch(paymentSuccess({orderId}));
      setOrder(orderId);
    }
    if(window.location.href.includes('canceled')){
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('orderId');
      dispatch(paymentCanceled(orderId));
      router.push('/cart');
    }
  },[])



  let totalPrice = 0;
  if(cartItems && cartItems.length){
    for(const id of cartItems){
      const price = products?.find((product) => product._id === id)?.price || 0;
      totalPrice+= price;
    }
  }
  


useEffect(() => {
  const token = localStorage.getItem('token')
  if(!token){
    dispatch({type: 'LOGOUT'});
    router.push('/auth');
  }
  const setProductsToPage = async () => {
    dispatch(fetchCartItems(cartItems)).then((res)=>{
      if(res?.data?.message === ('jwt error' || 'jwt expired')){
        dispatch({type: 'LOGOUT'})
      }else{
        console.log(res);
        setProducts(res?.data);
      }
    });
  }
  if(cartItems?.length>0){
    setProductsToPage();
  }
  },[]);
  
  useEffect(()=>{
    setFormData({...formData, orders:cartItems})
  },[cartItems])


  if(order !== null){
    return (
      <>
        <Header />
        <Wrapper>
          <div className='grid grid-cols-[1.3fr,.7fr] gap-10 my-10'>
            <div className='bg-[#ffffff] rounded-[10px] p-7 border-black shadow-2xl'>
                <div className='flex justify-center items-center p-40 text-4xl'>
                  <div>
                    <h1>Thanks for shopping with us.</h1>
                    <h1>Your order will be delievered soon!</h1>
                  </div>
                </div>
            </div>
              <div className='bg-[#fff] flex flex-col gap-2 rounded-[10px] p-7 h-fit border-black shadow-2xl'>
                  <h1 className='text-lg font-medium mb-2 border-b shadow-md p-2'>Order Information</h1>
                  {/* <input name='name' className='border rounded-sm p-1' value={formData.name} type="text" placeholder='Name*' onChange={handleChange} required />
                  <input name='email' className='border rounded-sm p-1' value={formData.email} type="text" placeholder='Email*' onChange={handleChange} required />
                  <div className='flex gap-2'>
                    <input name='country' className='border rounded-sm p-1 w-full' value={formData.country} type="text" placeholder='Country*' onChange={handleChange} required />
                    <input name='city' className='border rounded-sm p-1 w-full' value={formData.city} type="text" placeholder='City*' onChange={handleChange} required />
                    <input name='pincode' className='border rounded-scartItemsm p-1 w-full' value={formData.pincode} type="number" placeholder='Pin Code*' onChange={handleChange} required />
                  </div>
                  <input name='address' className='border rounded-sm p-1' value={formData.address} type="text" placeholder='Address*' onChange={handleChange} required />
                  <input name='landmark' className='border rounded-sm p-1' value={formData.landmark} type="text" placeholder='Landmark' onChange={handleChange} />
                  <button type='submit' className='bg-green-800 text-white p-1 rounded-md w-full'>Checkout</button> */}
              </div>
          </div>
        </Wrapper>
    </>
    )
  }

  
  return (
    <>
        <Header />
        <Wrapper>
          <div className='grid grid-cols-[1.3fr,.7fr] gap-10 my-10'>
            <div className='bg-[#ffffff] rounded-[10px] p-7 border-black shadow-2xl'>
              {
                cartItems && !cartItems.length
                ?
                <div className='flex justify-center items-center p-40 text-4xl'>Your cart is empty!</div>
                :
                <div>
                  <h1 className='font-medium text-2xl uppercase mb-3 shadow-md border p-2 rounded-md'>your Cart</h1>
                  <table className='w-full text-left uppercase text-black/[.9] font-normal text-[1rem]'>
                    <thead className='text-black/[.9]'>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        products?.length && products.map((p) => ( 
                          cartItems && cartItems.filter(id=>id===p._id).length 
                          ?
                            <tr key={p._id} className='m-10 border-t border-[#e5e5e5]'>
                              <td className='py-2'>
                                <div className='flex items-center justify-center min-h-[150px] mt-1 max-h-[150px] max-w-[150px] p-2 bg-[#f0f0f0] rounded-lg shadow-[1px_1px_3px_rgba(0,0,0,0.5)] overflow-hidden'>
                                  <img className='max-h-full' src={p.images} alt={p.title} />
                                </div>
                                {p.title}
                              </td>
                              <td>
                                <button onClick={()=>dispatch(removeFromCart(p._id))} className='bg-black/[.2] p-1 rounded-sm w-8'>-</button>
                                <span className='px-1'>
                                  {cartItems && cartItems.filter(id=>id===p._id).length}
                                </span>
                                <button onClick={()=>dispatch(addToCart(p._id))} className='bg-black/[.2] p-1 rounded-sm w-8'>+</button>
                              </td>
                              <td>&#8377;&nbsp;{cartItems && (cartItems.filter(id=>id===p._id).length)*p.price}</td>
                            </tr>
                          :
                          ''
                        ))
                      }
                      <tr className='border-y'>
                        <td></td>
                        <td className='py-2'>Total</td>
                        <td className=''>&#8377;&nbsp;{totalPrice}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              }
            </div>
            {
              cartItems && !!cartItems.length 
                && 
              <div className='bg-[#fff] flex flex-col gap-2 rounded-[10px] p-7 h-fit border-black shadow-2xl'>
                <form className='flex flex-col gap-3' onSubmit={checkout}>
                  <h1 className='text-lg font-medium mb-2 border-b shadow-md p-2'>Order Information</h1>
                  <input name='name' className='border rounded-sm p-1' value={formData.name} type="text" placeholder='Name*' onChange={handleChange} required />
                  <input name='email' className='border rounded-sm p-1' value={formData.email} type="text" placeholder='Email*' onChange={handleChange} required />
                  <div className='flex gap-2'>
                    <input name='country' className='border rounded-sm p-1 w-full' value={formData.country} type="text" placeholder='Country*' onChange={handleChange} required />
                    <input name='city' className='border rounded-sm p-1 w-full' value={formData.city} type="text" placeholder='City*' onChange={handleChange} required />
                    <input name='pincode' className='border rounded-scartItemsm p-1 w-full' value={formData.pincode} type="number" placeholder='Pin Code*' onChange={handleChange} required />
                  </div>
                  <input name='address' className='border rounded-sm p-1' value={formData.address} type="text" placeholder='Address*' onChange={handleChange} required />
                  <input name='landmark' className='border rounded-sm p-1' value={formData.landmark} type="text" placeholder='Landmark' onChange={handleChange} />
                  <button type='submit' className='bg-green-800 text-white p-1 rounded-md w-full'>Checkout</button>
                </form>
              </div>
            }
          </div>
        </Wrapper>
    </>
  );
}

export default Cart;
