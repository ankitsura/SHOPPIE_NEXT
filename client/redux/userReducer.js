import { createReducer, createAction } from "@reduxjs/toolkit";

const LOGIN = createAction('LOGIN');
const LOGOUT = createAction('LOGOUT');
const SIGN_UP = createAction('SIGN_UP');

var token = [];

export const userReducer = createReducer(token, (builder) => {
  builder
    .addCase(LOGIN, (state, action) => {
        console.log(action.token);
        return [action?.token];

    })
    .addCase(SIGN_UP, (state, action) => {
        console.log(action.token);
        return [action?.token];

    })
    // .addCase(LOGOUT, (state, action) => {
    //     localStorage.clear();
    //     return {...state, authData: null};

    // })
})
