import { createReducer, createAction } from "@reduxjs/toolkit";

const ADD_TO_CART = createAction('ADD_TO_CART');
const cart = []

export const cartReducer = createReducer(cart, (builder) => {
  builder
    .addCase(ADD_TO_CART, (state, action) => {
        if(state.includes(action?.id)){
            return;
        }
        return [...state, action?.id];

    })
    // .addCase(LOGOUT, (state, action) => {
    //     localStorage.clear();
    //     return {...state, authData: null};

    // })
})
