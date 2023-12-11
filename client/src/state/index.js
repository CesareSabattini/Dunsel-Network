import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    searchedUser: null,
    posts: [],
  };

  export const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
        setLogin: (state, action)=>{
            state.user= action.payload.user;
            state.token= action.payload.token;
        },
        setLogout: (state)=>{
            state.user= null;
            state.token= null;
        },
        setSearchedUser: (state)=>{
          state.searchedUser= action.payload.searchedUser;
        }
    }
  })

  
export const { setLogin, setLogout, setSearchedUser} = authSlice.actions;
export default authSlice.reducer;