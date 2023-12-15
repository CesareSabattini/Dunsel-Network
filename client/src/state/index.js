import { createSlice } from "@reduxjs/toolkit";

class Post{
  constructor(username, url,description){
this.username=username;
this.url=url;
this.description=description;
  }
   getURL(){
    return this.url;
  }
  username;
  url;
  description;
}

const initialState = {
    user: null,
    token: null,
    searchedUser: null,
    searchedUserPosts: Array(),
    posts: Array(),
  };

  export const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
        setLogin: (state, action)=>{
            state.user= action.payload.user;
            state.token= action.payload.token;
            state.posts= action.payload.posts
          
        },
        setLogout: (state)=>{
            state.user= null;
            state.token= null;
            state.posts=[]
        },
        setSearchedUser: (state, action)=>{
          state.searchedUser= action.payload.searchedUser;
        },
        setSearchedUserPosts: (state, action)=>{
          state.searchedUserPosts= action.payload.searchedUserPosts;
        },
        setDefaultSearchedUser: (state, action)=>{
          state.searchedUserPosts=[];
        },
        setPosts: (state, action)=>{
          const post= new Post(action.payload.username, action.payload.url, action.payload.description);

         state.posts.push(post);
        }
    }
  })

  
export const { setLogin, setLogout, setSearchedUser, setPosts, setSearchedUserPosts} = authSlice.actions;
export default authSlice.reducer;