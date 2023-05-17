import { createReducer, createAction, current } from "@reduxjs/toolkit";

const LOGIN = createAction('LOGIN');
const LOGOUT = createAction('LOGOUT');
const SIGN_UP = createAction('SIGN_UP');
const ADD_TO_CART = createAction('ADD_TO_CART');
const REMOVE_FROM_CART = createAction('REMOVE_FROM_CART');
const CHECKOUT = createAction('CHECKOUT');

var data = {};

export const userReducer = createReducer(data, async (builder) => {
  builder
    .addCase(LOGIN, (state, action) => {
        localStorage.setItem('token', action?.data?.token);
        const {data} = action?.data;
        return {...state, data};
    })
    .addCase(SIGN_UP, (state, action) => {
        localStorage.setItem('token', action?.data?.token);
        // const {data} = action?.data;
        return {...state, data: action.data};
    })
    .addCase(LOGOUT, (state, action) => {
        const router = action.router;
        localStorage.clear();
        router?.push('/auth');
        return {...state, data:{}}
    })
    .addCase(ADD_TO_CART, (state, action) => {
        const productId = action?.productId;
        let {data} = current(state);
        let cartItems = data.cartItems;
        cartItems = [...cartItems, productId]
        return {...state, data:{...data, cartItems: cartItems}}
    })
    .addCase(REMOVE_FROM_CART, (state, action) => {
        const productId = action?.productId;
        let {data} = current(state);
        let cartItems = [...data.cartItems];
        try {
            if(data.cartItems.includes(productId)){
                cartItems.splice((cartItems.indexOf(productId)), 1);
                const newData = cartItems;
                return {...state, data: {...data, cartItems: newData}};
            } else {
                return {...state}
            } 
        } catch (error) {
            console.log(error);
        }
        
    })
    .addCase(CHECKOUT, (state, action) => {
        let {data} = current(state);
        let cartItems = data.cartItems;
        cartItems = []
        return {...state, data:{...data, cartItems, orders:[...data.orders, action.order.toString()]}}
    })
})
