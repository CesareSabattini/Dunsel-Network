import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setFeedPosts, setLogout, setPosts, setPosts2, setSearchedUser, setSearchedUserPosts } from "../../state/index";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useState} from 'react';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ProfileImage from '../../components/ProfileImage'
import HomeIcon from '@mui/icons-material/Home';
import ResponsiveAppBar from '../../components/Navbar';


const ProfilePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const description= user.description;
  const token= useSelector((state) => state.token);
 const profilePhoto= useSelector((state)=>state.profilePhoto);

  const posts= useSelector((state)=>state.posts)
  
  const [inputUser, setMessage] = useState('');

  const handleChange = event => {
    setMessage(event.target.value);

    console.log(inputUser);
  };

  

  const handleKeyDown = async event => {
  
    if (event.key === 'Enter') {
 
      event.preventDefault();
    
      console.log(token)

     
      const res= await axios.get(`http://localhost:3001/user/${inputUser}`,
      {
        headers:{
          'Authorization': 'Bearer ' + token
        }
      })
.then((response)=>{
  console.log(response.data);
  dispatch(
    setSearchedUserPosts({
      searchedUserPosts: response.data.posts
    })
  )
   dispatch(
    setSearchedUser({
      searchedUser: response.data.user,
    },  navigate(`/user/${inputUser}`) ))
})

    }
  };

  const createPost= async event=>{
    event.preventDefault();
    navigate('/createPost');
    console.log(user.followed);
   }

   const navigateHome= async event=>{
    event.preventDefault();

    const feedPosts= await axios.get(`http://localhost:3001/community/getFeedPosts/${user.userName}`,
    {
      headers:{
        'Authorization': 'Bearer ' + token
      }
    }
    ).then((response)=>{
      console.log(response);
    dispatch(setFeedPosts({
        feedPosts: response.data
      }))
      navigate('/home');
    })
   }

   const handlePostDelete= async (element)=>{
const reqData={
  userName: user.userName,
  postId: element._id
}
console.log(element._id)

const res=await axios.delete(`http://localhost:3001/post/delete/${user.userName}/${element._id}`,
{
  headers:{
    'Authorization': 'Bearer ' + token
  }
}
).then((response)=>{
  console.log(response);
  

})

const posts=await axios.get(`http://localhost:3001/post/get/${user.userName}`, {
  headers:{
    'Authorization': 'Bearer ' + token
  }
}).then((response)=>{
 console.log(response.data)
dispatch(
    setPosts2({
posts: response.data
    })
  )
 
})
   }
  return (
    <div>
      <ResponsiveAppBar/>
<div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-stone-200 h-[92vh]
grid'>

    <div  className=' col-span-7 row-start-1 flex rounded-lg font-mono m-2 bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-b border-sky-500 text-stone-100 text-sm '>
    <div className='grid grid-cols-2 grid-rows-2'>
      <div className='px-5 pt-2'>
    <ProfileImage  />
    </div>
  
    <div className='flex items-center font-bold text-2xl row-start-1 col-start-2'>
      {user.userName}
      </div>
 
<div className='row-start-2 pt-4 pl-5 overflow-hidden mr-5'>
Description: <br />
{description}
</div>
<div className='row-start-2 px-10'>
        Followers: {user.followers.length}
        <br />
        Followed: {user.followed.length}
        <br />
        Communities: {user.communities.length}
</div>
    </div>
    </div>
    <div className='row-start-2 col-span-6'>
    <input     
        id="searchedUser"
        name="searchedUser"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={inputUser} type="text" placeholder="Search User" className="input bg-black input-bordered input-info mx-4 max-w-xs" />
    
    <button className='ml-5 h-[10vh] w-[10vh] ' onClick={createPost}>
  <AddPhotoAlternateIcon />
</button>
<button className=' ml-5 h-[10vh] w-[10vh] ' onClick={navigateHome}>
  <HomeIcon/>
</button>
    </div>
  
<div className='col-span-7 row-start-3 gap-1 mx-6 overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-sky-600 border border-stone-200 border-b-2 rounded '>
<div className='grid grid-cols-2 col-span-3 row-span-1 gap-2 p-3'>
{posts.map(element => {
    return <div className='border rounded-xl border-stone-200 hover:border-4 hover:border-red-500' onClick={event=>{
      event.preventDefault();
      handlePostDelete(element)}} key={element._id}><img src={`./src/assets/background/${element.url}`} className='flex items-center rounded-xl ' /></div>
  })}
 </div>

</div>




    </div>
    </div>
  )
}

export default ProfilePage;
