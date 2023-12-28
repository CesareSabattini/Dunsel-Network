import { Box } from '@mui/material'
import React from 'react'

const CommunityPost = (post) => {
  return (
   <Box className=''>
    <div className='font-mono flex items-center bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-sky-500 my-4 px-3 mx-3 rounded py-1'>Username and post description</div>
    <div className='flex justify-center'>
    <img src='../src/assets/cat.jpeg' className='w-[60vh] rounded-lg' />
  </div> 
  </Box>

  )
}

export default CommunityPost