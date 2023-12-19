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


class Community{
  constructor(communityName,communityTheme, communityDescription){
this.communityName=communityName;
this.communityTheme=communityTheme;
this.communityDescription=communityDescription;
  }

  communityName;
  communityTheme;
  communityDescription;
}

const initialState = {
    user: null,
    token: null,
    searchedUser: null,
    description: '',
    searchedUserPosts: Array(),
    posts: Array(),
    profilePhoto:'',
    communities: Array(),
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
          
        },
        setLogout: (state)=>{
            state.user= null;
            state.token= null;
            state.posts=[];
            state.profilePhoto=null;
            state.communities=Array();
            state.description='';
            state.searchedUser= null;
            state.searchedUserPosts= Array();
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
        setProfilePhoto: (state, action)=>{
          state.profilePhoto=action.payload.profilePhoto;
        },
        setCommunities: (state, action)=>{
          const newCommunity= new Community(action.payload.communityName, action.payload.communityTheme, action.payload.communityDescription);
          state.communities.push(newCommunity);
        },
        setDescription: (state, action)=>{
          state.description= action.payload.description;
        },
        setFollowers: (state, action)=>{
          state.user.followers= action.payload.followers;
        },
        setFollowed: (state, action)=>{
          state.user.followed= action.payload.followed;
        }
    }
  })

  
export const { setLogin, setLogout, setSearchedUser, setPosts, setSearchedUserPosts, setProfilePhoto, setCommunities, setDescription, setFollowed, setFollowers} = authSlice.actions;
export default authSlice.reducer;