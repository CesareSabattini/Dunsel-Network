import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setSearchedUser, setSearchedUserPosts } from "../../state/index";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import cat from '../../assets/cat.jpeg'
import {useState} from 'react';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


const ProfilePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const searchedUser = useSelector((state) => state.searchedUser);
 
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
   }

  return (
<div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white h-[100vh]
grid grid-cols-6 grid-rows-4
'>
    <div className='flex justify-center items-center col-start-1 col-span-2'>
<AccountCircleIcon  sx={{ fontSize: '20vh' }}/>
    </div>
    <div  className='col-start-1 col-span-2 flex justify-center'>
    <div>
        Firstname: {user.firstName}
        <br />
        Lastname: {user.lastName}
        <br />
        Description:
        <br />
        Followers:
        <br />
        Followed:
        <br />
        <input     
        id="searchedUser"
        name="searchedUser"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={inputUser} type="text" placeholder="Search User" className="input mt-5 bg-black input-bordered input-info max-w-xs" />
    
    </div>
    </div>
    <div className='col-start-3 row-start-1 col-span-3 flex justify-center items-center font-bold text-3xl '>
        {user.userName}
    </div>
<div className='col-span-3 row-span-3 gap-1 overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-sky-600 mb-12 border border-sky-500 rounded'>
<div className='grid grid-cols-2 col-span-3 row-span-1 gap-2 p-3'>
{posts.map(element => {
    return <div className='border rounded-xl border-sky-500'><img key={element._id} src={`./src/assets/${element.url}`} className='flex items-center rounded-xl' /></div>
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
<button className='pt-4 pl-5' onClick={createPost}>
  <AddPhotoAlternateIcon />
</button>


    </div>
  )
}

export default ProfilePage;
