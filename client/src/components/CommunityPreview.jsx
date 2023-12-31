import React, { useState } from 'react'
import PeopleIcon from '@mui/icons-material/People';
import { useSelector } from 'react-redux';

const CommunityPreview = ({communityName, communityImage}) => {
    const profilePhoto= useSelector((state)=>state.profilePhoto)
  return (
    <span className='flex items-center pl-3 border-y text-lg border-sky-500 h-full cursor-pointer break-words'>
<PeopleIcon className='mr-2'/>
<div className='text-md break-words w-[75%]'>{communityName}</div>
    </span>
  )
}

export default CommunityPreview