import React, { useState } from 'react'
import Navbar  from '../../components/Navbar';
import CommunityPost from '../../components/CommunityPost';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CommunityPage = ({location}) => {
  
  
  const navigate= useNavigate()
const community= useSelector((state)=>state.searchedCommunity)
const user= useSelector((state)=>state.user)
let isMember= community.members.includes(user.userName)
const token= useSelector(state=>state.token)
const handleJoinCommunity= async ()=>{
  const data={}

const res= await axios.post(`http://localhost:3001/community/${user.userName}/addTo/${community.communityName}`,data,
{
  headers:{
    'Authorization': "Bearer " + token
  }
}
)
.then((response)=>{
  console.log(response.data);
  navigate('/home')
  
})
}  

const handleLeaveCommunity= async ()=>{

  const res= await axios.post(`http://localhost:3001/community/${user.userName}/leaves/${community.communityName}`,
  {},
  {
    headers:{
      'Authorization': "Bearer " + token
    }
  }
  )
.then((response)=>{
  
  navigate('/home')
  
})

}

return (
    <div className=' bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white h-[100vh]'>
     <Navbar/>
<div className='grid grid-cols-4 divide-x'>
  <div className='h-[90vh]'>

    <div className='flex justify-center'>
{isMember ? (   <button className='flex items-center justify-center bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 rounded bg-black w-full mt-10 rounded-lg py-4 font-mono font-bold w-[80%] mx-1'
    
    onClick= {event=>{
      event.preventDefault();
      navigate('createCommunityPost');
    }}
    >
      Add Post</button>) : (
           <button className='flex w-[80%] mx-1 items-center justify-center bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 rounded bg-black w-full mt-10 rounded-lg py-4 font-mono font-bold'
    
           onClick= {async (event)=>{
             event.preventDefault();
            await handleJoinCommunity();
           }}
           >
             Join</button>
      )}
    </div>
    <div className='flex justify-center'>
{isMember ? (   <button className='flex w-[80%] mx-1 items-center justify-center bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 rounded bg-black w-full mt-10 rounded-lg py-4 font-mono font-bold'
    
    onClick= {async event=>{
      event.preventDefault();
     await handleLeaveCommunity();
    }}
    >
      Leave Community</button>) : (
           <div></div>
      )}
    </div>
 


    </div>
  <div className='col-start-2 col-span-3 h-[91vh]'>
    
    <div className='flex justify-center mx-[0vh] my-10 text-3xl font-bold font-mono'>
 {community.communityName}
      </div>
    
    <div className='grid grid-cols-2 border-b'>
    <div className='text-center'>
      Members: {community.members.length}
    </div>
    <div className='text-center'>
      Posts: {community.posts.length}
    </div>
    </div>
    <div className='h-[71vh] overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-sky-600'>
  

  
  {community.posts.map(element => {
    return <CommunityPost post={element}/>})}
</div>
    </div>

</div>

    </div>
  )
}

export default CommunityPage;
