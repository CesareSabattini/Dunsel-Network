import React from 'react'
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import cat from '../../assets/cat.jpeg'
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


const UserPage = () => {    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params=useParams();
    const searchedUser= useSelector((state)=>state.searchedUser)

    const posts= [cat,cat,cat];
  return (
<div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white h-[100vh]
grid grid-cols-6 grid-rows-4
'>
    <div className='flex justify-center items-center col-start-1 col-span-2'>
<AccountCircleIcon  sx={{ fontSize: '20vh' }}/>
    </div>
    <div  className='col-start-1 col-span-2 flex justify-center'>
    <div>
      Firstname:
        <br />
        Lastname: {searchedUser.lastName}
        <br />
        Description:
        <br />
        Followers:
        <br />
        Followed:
    </div>
    </div>
    <div className='col-start-3 row-start-1 col-span-3 flex justify-center items-center font-bold text-3xl'>
    {searchedUser.userName}
    </div>
<div className='grid grid-cols-3 col-span-3 gap-1'>
<img src={posts[0]} alt="" />
<img src={posts[0]} alt="" />
<img src={posts[0]} alt="" />
<img src={posts[0]} alt="" />
<img src={posts[0]} alt="" />
<img src={posts[0]} alt="" />
<img src={posts[0]} alt="" />
<img src={posts[0]} alt="" />
<img src={posts[0]} alt="" />
</div>
</div>
  )
}

export default UserPage;