import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setPosts, setPosts2, setSearchedUser, setSearchedUserPosts } from "../../state/index";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useState} from 'react';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ProfileImage from '../../components/ProfileImage'
import HomeIcon from '@mui/icons-material/Home';

const ProfilePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const description= user.description;
  
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

     
      const res= await axios.get(`http://localhost:3001/user/${inputUser}`)
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
    navigate('/home');
   }

   const handlePostDelete= async (element)=>{
const reqData={
  userName: user.userName,
  postId: element._id
}
console.log(element._id)

const res=await axios.delete(`http://localhost:3001/post/delete/${user.userName}/${element._id}`).then((response)=>{
  console.log(response);
  

})

const posts=await axios.get(`http://localhost:3001/post/get/${user.userName}`).then((response)=>{
 console.log(response.data)
dispatch(
    setPosts2({
posts: response.data
    })
  )
 
})
   }
  return (
<div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-stone-200 h-[100vh]
grid grid-cols-6 grid-rows-4
'>
    <div className='flex justify-center items-center col-start-1 col-span-2'>
<ProfileImage  sx={{ fontSize: '20vh' }}/>
    </div>
    <div  className='col-start-1 col-span-2 flex justify-center rounded-lg items-center font-mono m-4 bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-b border-sky-500 text-stone-100'>
    <div>
        Firstname: {user.firstName}
        <br />
        Lastname: {user.lastName}
        <br />
        Description: {description}
        <br />
        Followers: {user.followers.length}
        <br />
        Followed: {user.followed.length}
        <br />

    </div>
    </div>
    <div className='col-start-1 row-start-3 col-span-2 '>
    <input     
        id="searchedUser"
        name="searchedUser"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={inputUser} type="text" placeholder="Search User" className="input mt-5 bg-black input-bordered input-info m-4 max-w-xs" />
    
    <button className='pt-4 ml-5 h-[10vh] w-[10vh] ' onClick={createPost}>
  <AddPhotoAlternateIcon />
</button>
<button className=' ml-5 h-[10vh] w-[10vh] col-start-6 row-start-' onClick={navigateHome}>
  <HomeIcon/>
</button>
    </div>
    <div className='col-start-3 row-start-1 col-span-3 flex justify-center items-center font-bold text-3xl '>
        {user.userName}
    </div>
<div className='col-span-3 row-span-3 gap-1 overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-sky-600 mb-12 border border-stone-200 border-b-2 rounded'>
<div className='grid grid-cols-2 col-span-3 row-span-1 gap-2 p-3'>
{posts.map(element => {
    return <div className='border rounded-xl border-stone-200 hover:border-4 hover:border-red-500' onClick={event=>{
      event.preventDefault();
      handlePostDelete(element)}} key={element._id}><img src={`./src/assets/background/${element.url}`} className='flex items-center rounded-xl ' /></div>
  })}
 </div>

</div>



<div className="col-start-6 row-start-1 dropdown pt-5 pl-5">
  <div tabIndex={0} role="button" className="btn m-1 bg-black text-white hover:bg-white hover:text-black "><MenuIcon/></div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white text-black rounded-box w-30">
    <li><button onClick={() =>{dispatch(setLogout())
    navigate('/logIn')}}
    >Log out</button></li>
    <li><button onClick={() =>{ 
    navigate('/settings')}}>Settings</button></li>
  </ul>
</div>



    </div>
  )
}

export default ProfilePage;
