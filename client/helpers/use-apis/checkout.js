import { API } from "../hosted-axios";


export const placeOrder = (orderInfo) => async (dispatch) =>{
    const {data} = await API.post('http://localhost:5000/order/checkout', orderInfo);
    return data
}; 

export const paymentSuccess = (orderId) => async (dispatch) =>{
    const {data} = await API.post('http://localhost:5000/order/paymentDone', orderId);
    dispatch({type: 'CHECKOUT', order: data.orderId})
    return data
}; 
export const paymentCanceled = (orderId) => async (dispatch) =>{
    const {data} = await API.post('http://localhost:5000/order/paymentCanceled', orderId);
    // dispatch({type: 'CHECKOUT', order: data.order._id})
    return data
}; 

