import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CommentsSection from './CommentsSection';

const CommunityPost = (post) => {
  const navigate= useNavigate();
  
  return (
   <Box className='py-5 border-b'>
  
    <div className='font-mono flex items-center bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-sky-500 my-4 px-3 mx-3 rounded py-1'
    
    onClick= {event=>{
      event.preventDefault();
      navigate(`/user/${post.post.userName}`);
    }}>
    {post.post.userName}
      </div>

   <div className='font-mono flex items-center bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-sky-500 my-4 px-3 mx-3 rounded py-1'>
   Description: <div className='text-sm pl-2'>{post.post.description}</div>
    </div>
    <div className='flex justify-center'>
    
    <img src={`../src/assets/background/${post.post.url}`}className='w-[60vh] rounded-lg' />
  </div> 
  <div className='font-mono flex items-center bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-sky-500 my-4 px-3 mx-3 rounded py-1'>
<CommentsSection post={post.post}/>
  </div>
  </Box>

  )
}

export default CommunityPost