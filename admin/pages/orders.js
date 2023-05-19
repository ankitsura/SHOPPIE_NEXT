import Layout from '@/components/Layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const orderPage = ({allOrders}) => {

    console.log(allOrders);
    const [orders, setOrders] = useState([]);
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(()=>{
        setDomLoaded(true);
        setOrders(allOrders);
    },[]);


  return (
    <Layout>
        <h1 className='page-heading'>Orders</h1>
        <table className='basic rounded-t-lg overflow-hidden'>
            <thead className='rounded-t-lg'>
                <tr className=''>
                    <th className='p-1'>Date</th>
                    <th className='p-1'>Recipient</th>
                    <th className='p-1'>Products</th>
                    <th className='p-1'>Payment Status</th>
                </tr>
            </thead>
            <tbody className=''>
            {domLoaded && orders.length && orders.map((order)=> (
                <tr key={order._id} className='border-b'>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                        {order.name} ({order.email}) <br />
                        {order.city}, {order.pincode} <br />
                        {order.country} <br />
                        {order.address} <br />
                    </td>
                    <td>{order.items.map((item)=>(
                        <>
                            {item?.price_data?.product_data?.name} &#215; {item.quantity}
                            <br /> 
                            &#8377;{(item?.price_data?.unit_amount/100)} /_
                            <br />
                        </>
                    ))}</td>
                    <td className={order.paymentStatus ? 'text-green-600' : 'text-red-600'}>{order.paymentStatus ? 'Done' : 'Not Done'}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </Layout>
  );
}

export default orderPage;

export const getServerSideProps = async () => {
    const allOrders = await axios.get('http://localhost:5000/admin/getOrders');
    return {
      props: {
        allOrders: JSON.parse(JSON.stringify(allOrders?.data))
      }
    }
}
