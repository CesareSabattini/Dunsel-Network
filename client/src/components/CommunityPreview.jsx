import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';

const CommunityPreview = () => {
    const profilePhoto= useSelector((state)=>state.profilePhoto)
  return (
    <span className='flex items-center pl-3 border-y text-lg  border-sky-500'>
<Avatar src={`./src/assets/background/${profilePhoto}`} className='mr-2'/>
Community number 1
    </span>
  )
}

export default CommunityPreview