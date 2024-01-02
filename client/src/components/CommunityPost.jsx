import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CommentsSection from './CommentsSection';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedUser, setSearchedUserPosts } from '../state';
import './CommunityPost.css'

const CommunityPost = (post) => {
  const navigate= useNavigate();
  const dispatch=useDispatch()
  const token= useSelector(state=>state.token)

  const handleClickUser = async (clickedUser) => {
    const res= await axios.get(`http://localhost:3001/user/${clickedUser}`,
    {headers: {
      'Authorization': 'Bearer ' + token}
    }
    )
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
  },  navigate(`/user/${clickedUser}`) ))
})

  
};
  
  return (
   <Box className='pb-5 border-b'>
  
    <div className='font-mono flex items-center bg-sky-500 bg-clip-padding 
    backdrop-filter backdrop-blur-sm bg-opacity-20 border-sky-500 my-4 px-3
     mx-4 rounded py-1'
    
    onClick= {event=>{
      event.preventDefault();
      handleClickUser(post.post.userName);
    }}>
    <div className=' hover:text-sky-500 duration-200 rounded cursor-pointer '>{post.post.userName}</div>
      </div>

   <div className='font-mono bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-sky-500 my-4 px-3 mx-4 rounded py-1'>
  <div>Description:</div>  
   <div className='text-sm pl-2' style={{
    wordWrap: 'break-word',
    width: '100%'
    
   }}
   >{post.post.description}</div>
    </div>
    <div className='flex justify-center w-[100%] px-8'>
    
    <img src={`../src/assets/background/${post.post.url}`} className='w-[60vh] rounded-lg ' />
  </div> 
  <div className='font-mono flex items-center bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-sky-500 my-4 px-3 mx-4 rounded py-1'>
<CommentsSection post={post.post}/>
  </div>
  </Box>

  )
}

export default CommunityPost