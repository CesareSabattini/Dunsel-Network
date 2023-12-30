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
    description: '',
    searchedUserPosts: Array(),
    posts: Array(),
    profilePhoto:'',
    searchedCommunity: null,
    feedPosts: Array()
  };

  export const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
        setLogin: (state, action)=>{
            state.user= action.payload.user;
            state.token= action.payload.token;
            state.posts= action.payload.posts;
            state.profilePhoto= action.payload.profilePhoto;
            state.communities= action.payload.communities          
        },
        setLogout: (state)=>{
            state.user= null;
            state.token= null;
            state.posts=[];
            state.profilePhoto=null;
            state.communities=null;
            state.description='';
            state.searchedUser= null;
            state.searchedUserPosts= Array();
            state.searchedCommunity= null;
            state.feedPosts=Array();
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
        },
        setPosts2: (state,action)=>{
          state.posts= action.payload.posts;
        },
        setProfilePhoto: (state, action)=>{
          state.profilePhoto=action.payload.profilePhoto;
        },
        setDescription: (state, action)=>{
          state.description= action.payload.description;
        },
        setFollowers: (state, action)=>{
          state.user.followers= action.payload.followers;
        },
        setFollowed: (state, action)=>{
          state.user.followed= action.payload.followed;
        },
        setSearchedCommunity: (state, action)=>{
          state.searchedCommunity=action.payload.communityData;
        },
        setUser:(state, action)=>{
          state.user= action.payload.user;
        },
        setFeedPosts: (state, action)=>{
          state.feedPosts=action.payload.feedPosts
        }
    }
  })

  
export const { setLogin, setLogout, setSearchedUser, setPosts, setSearchedUserPosts, setProfilePhoto, setDescription, setFollowed, setFollowers, setPosts2, setSearchedCommunity, setUser, setFeedPosts} = authSlice.actions;
export default authSlice.reducer;