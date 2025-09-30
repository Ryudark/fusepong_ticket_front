import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState ={
    value: AuthState;
}

type AuthState = {
    isAuthenticated:boolean,
    user:object
    token:string
}

const initialState = {
    value:{
        isAuthenticated:false,
        user:{},
        token:""
    }as AuthState
}as InitialState

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logOut : () =>{
            return initialState
        }
        logIn: (state, action:PayloadAction<string>)=>{
            return{
                value
            }
        }
    }
})