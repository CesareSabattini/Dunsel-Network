import React from 'react'
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import cat from '../../assets/cat.jpeg'
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import { setFollowed, setUser } from '../../state/index';
import ResponsiveAppBar from '../../components/Navbar';

const UserPage = () => {    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params=useParams();
    const searchedUser= useSelector((state)=>state.searchedUser)
const user= useSelector((state)=>state.user)
const token= useSelector(state=>state.token)
    const posts= useSelector((state)=>state.searchedUserPosts)
   
    const navigateBack= async event=>{
      event.preventDefault();
      navigate('/profilePage');
     }
  
     const addFollowed= async ()=>{
      const reqData={
        userName: user.userName,
        followedName: searchedUser[0].userName
      }

     await axios.post('http://localhost:3001/user/addFollowed', reqData,
     
     {
      headers:{
        'Authorization': 'Bearer ' + token
      }
     }
     ).then((response)=>{
      
    if(response.data==='Already Following'){
      console.log(response);
    }
    else{setFollowed({
      followed: response.followed,
      followers: response.followers
    })
  
  console.log(user.followed)
}
    })

   await axios.get(`http://localhost:3001/user/${user.userName}`,
   {
    headers:{
      'Authorization': "Bearer " + token
    }
  }
   ).then((response)=>{
    console.log(response.data.user)
   dispatch(
      setUser({
        user:response.data.user[0]
      }
      )
    )
   })

     }


  return (
    <div>
      <ResponsiveAppBar/>
<div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white h-[92vh]
grid grid-rows-6
'>
    <div className='col-span-6 row-span-2 flex rounded-lg font-mono m-2 bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-b border-sky-500 text-stone-100 text-sm '>
      <div className='grid grid-cols-2 grid-rows-2'>
        <div className='pl-[20%] pt-1'>
<img className=' rounded-full w-[15vh]' src={`../src/assets/background/${searchedUser[0].profilePhoto}`}/>
   </div>

   <div className='flex items-center font-bold text-2xl row-start-1 col-start-2'>
    {searchedUser[0].userName}
    </div>
  
    <div className='row-start-2 pl-[20%] pt-2'>
    
        Followers: {searchedUser[0].followers.length}
        <br />
        Followed: {searchedUser[0].followed.length}
        <br />
        <button className='hover:text-sky-500 delay-75 pl-5 border-2 flex pt-2 pb-3 pr-5 rounded-xl ml-2 mt-1 bg-black border-sky-500' onClick={addFollowed}>
           <PersonAddIcon /></button>
    </div>


    <div className='row-start-2 overflow-hidden mr-5 break-words'>
    <br />
        Description: {searchedUser[0].description}
        </div>
  
    </div>
    
    </div>

    <div className='col-span-6 row-span-4 mx-3 gap-1 overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-sky-600 mb-2 border border-sky-500 rounded mt-2'>
<div className='grid grid-cols-2 col-span-3 row-span-1 gap-2 p-3'>
{posts.map(element => {
    return <div className='border rounded-xl border-sky-500'><img key={element.id} src={`../src/assets/background/${element.url}`} className='flex items-center rounded-xl' /></div>
  })}
 </div>

</div>


</div>
</div>
  )
  
}

export default UserPage;