import React, { useState } from 'react'
import PeopleIcon from '@mui/icons-material/People';
import { useSelector } from 'react-redux';

const CommunityPreview = ({communityName, communityImage}) => {
    const profilePhoto= useSelector((state)=>state.profilePhoto)
  return (
    <span className='flex items-center pl-3 border-y text-lg  border-sky-500'>
<PeopleIcon src={`./src/assets/background/${communityImage}`} className='mr-2'/>
{communityName}
    </span>
  )
}

export default CommunityPreview