import React, { useState } from 'react'
import Navbar  from '../../components/Navbar';
import CommunityPost from '../../components/CommunityPost';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CommunityPage = ({location}) => {
  
  const navigate= useNavigate()
const community= useSelector((state)=>state.searchedCommunity)
const posts= community.posts  

  return (
    <div className=' bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white h-[100vh]'>
     <Navbar/>
<div className='grid grid-cols-4 divide-x'>
  <div className='h-[90vh]'>
    <button className='bg-black w-full mt-10 rounded-lg py-4 font-mono font-bold '
    
    onClick= {event=>{
      event.preventDefault();
      navigate('createCommunityPost');
    }}
    >
      Add Post</button>
    </div>
  <div className='col-start-2 col-span-3 h-[90vh]'>
    
    <div className='flex justify-center mx-[40vh] my-10 text-3xl font-bold font-mono'>
 {community.communityName}
      </div>
    
    <div className='grid grid-cols-2 border-b'>
    <div className='text-center'>
      Members:
    </div>
    <div className='text-center'>
      Posts:
    </div>
    </div>
    <div className='h-[70vh] overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-sky-600'>
    {posts.map(element => {
    return <CommunityPost post={element.url}/>
  })}
  <button onClick={event=>{console.log(community)}}>Click</button>
  
</div>
    </div>

</div>

    </div>
  )
}

export default CommunityPage;
