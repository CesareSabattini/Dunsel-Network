import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state/index";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import cat from '../../assets/cat.jpeg'



const ProfilePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
   


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
        Firstname: {user.firstName}
        <br />
        Lastname: {user.lastName}
        <br />
        Description:
        <br />
        Followers:
        <br />
        Followed:
    </div>
    </div>
    <div className='col-start-3 row-start-1 col-span-3 flex justify-center items-center font-bold text-3xl'>
        {user.userName}
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

export default ProfilePage;