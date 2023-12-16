import React from 'react'
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Settings = () => {
  const navigate= useNavigate();

  const navigateBack= async event=>{
    event.preventDefault();
    navigate('/profilePage');
   }

  return (
    <div className='h-[100vh] bg-black text-white'>
<div className='text-5xl font-bold px-10 pt-10'>
Settings

<div className='row-start-1 col-start-6 text-sky-500 flex justify-end pr-[40vh] pt-0'>
  <button onClick={navigateBack}>
   <ArrowBackIcon className='border rounded-full shadow-sky-500 shadow-lg mb-10'/>
   </button>
   </div>
</div>

<div className='px-10 '>
 <div className='font-bold text-2xl pb-4'>
  Profile's Settings:
  </div>

<span> Change Username </span>
<br />
<span> Change Password </span>
<br />
<span> Change Description</span>
<br />
<span className='text-red-500'>Delete Account</span>
</div>

    </div>
  )
}

export default Settings