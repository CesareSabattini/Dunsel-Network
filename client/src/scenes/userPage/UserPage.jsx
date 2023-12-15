import React from 'react'
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import cat from '../../assets/cat.jpeg'
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const UserPage = () => {    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params=useParams();
    const searchedUser= useSelector((state)=>state.searchedUser)

    const posts= useSelector((state)=>state.searchedUserPosts)
  
  return (
<div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white h-[100vh]
grid grid-cols-6 grid-rows-4
'>
    <div className='flex justify-center items-center col-start-1 col-span-2'>
<AccountCircleIcon  sx={{ fontSize: '20vh' }}/>
    </div>
    <div  className='col-start-1 col-span-2 flex justify-center'>
    <div>
      Firstname: {searchedUser[0].firstName}
        <br />
        Lastname: {searchedUser[0].lastName}
        <br />
        Description:
        <br />
        Followers:
        <br />
        Followed:
        <br />
        <button className='hover:text-sky-500 delay-75 pt-8 pl-5 border-2 flex pt-3 pb-3 pr-5 rounded-xl mt-8 bg-black border-sky-500'> <PersonAddIcon className=''/></button>
    </div>
    </div>
    <div className='col-start-3 row-start-1 col-span-3 flex justify-center items-center font-bold text-3xl'>
    {searchedUser[0].userName}
    </div>
<div className='grid grid-cols-3 col-span-3 gap-1'>
{posts.map(element => {
    return <img key={element.url+element.description} src={`../${element.url}`} className='flex items-center' />
  })}
  
</div>
<span className='row-start-1 col-start-6 pt-10 text-sky-500'> <ArrowBackIcon className='border rounded-full shadow-sky-500 shadow-lg'/></span>
</div>
  )
}

export default UserPage;