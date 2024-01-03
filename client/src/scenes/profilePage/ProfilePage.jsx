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

function DeleteButton() {
  return (
  
      <button className='bg-red' >Delete</button>

  );
}

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

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
     setIsHover(true);
  };
  const handleMouseLeave = () => {
     setIsHover(false);
  };

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
grid grid-rows-6 grid-cols-6'>

    <div className='col-span-6 row-span-2 md:col-span-2  md:row-span-5 mx-4 flex rounded-lg font-mono m-2 bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-b border-sky-500 text-stone-100 text-sm '>
    <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-2 md:grid-rows-4'>
      <div className='pl-[20%] md:col-span-3 md:pt-0 pt-2 md:row-start-2'>
    <ProfileImage  />
    </div>
  
    <div className='flex items-center font-bold text-2xl row-start-1 col-start-2 md:col-start-1 md:col-span-2 md:justify-center'>
      {user.userName}
      </div>
 
<div className='row-start-2 md:row-start-3 pl-[20%] pt-5 md:col-span-3'>
        Followers: {user.followers.length}
        <br />
        Followed: {user.followed.length}
        <br />
        Communities: {user.communities.length}
</div>
<div className='row-start-2 md:row-start-4 md:pl-4 md:col-span-2 overflow-hidden mr-5 break-words'>
Description: <br />
{description}
</div>
    </div>
    </div>
   
<div className='col-span-6 row-start-3 row-span-4 md:col-span-4 md:row-span-6 mt-2 gap-1 mx-6 overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-sky-600 border border-stone-200 border-b-2 rounded '>
<div className='grid grid-cols-2 col-span-3 row-span-1 gap-2 p-3'>
{posts.map(element => {
    return <div className='border flex bg-black rounded-xl border-stone-200 hover:border-4 hover:border-red-500 justify-center' 
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave} 
     key={element._id}>
        
        <img src={`./src/assets/background/${element.url}`} className='flex items-center rounded-xl ' />
      
        {isHover && <div className='text-center text-black font-mono font-bold hover:text-white bg-red-500 fixed px-2 w-[20%] rounded-b'
        
        onClick={event=>{
      event.preventDefault();
      handlePostDelete(element)}}> <DeleteButton /></div>}
      </div>
  })}
 </div>

</div>
    </div>
    </div>
  )
}

export default ProfilePage;
