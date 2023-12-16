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
   
    const navigateBack= async event=>{
      event.preventDefault();
      navigate('/profilePage');
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
        <button className='hover:text-sky-500 delay-75 pl-5 border-2 flex pt-3 pb-3 pr-5 rounded-xl mt-8 bg-black border-sky-500'>
           <PersonAddIcon className=''/></button>
    </div>
    </div>
    <div className='col-start-3 row-start-1 col-span-3 flex justify-center items-center font-bold text-3xl'>
    {searchedUser[0].userName}
    </div>

    <div className='col-span-3 row-span-3 gap-1 overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-sky-600 mb-12 border border-sky-500 rounded'>
<div className='grid grid-cols-2 col-span-3 row-span-1 gap-2 p-3'>
{posts.map(element => {
    return <div className='border rounded-xl border-sky-500'><img key={element.id} src={`../src/assets/${element.url}`} className='flex items-center rounded-xl' /></div>
  })}
 </div>

</div>

<div className='row-start-1 col-start-6 pt-10 text-sky-500 '>
  <button onClick={navigateBack}>
   <ArrowBackIcon className='border rounded-full shadow-sky-500 shadow-lg mr-10'/>
   </button>
   </div>

</div>
  )
}

export default UserPage;