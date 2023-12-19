import React from 'react'
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { colors } from '@mui/material';
import { Formik, Form } from 'formik';
import { Field } from 'formik';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setDescription } from '../../state/index';

const Settings = () => {
  const navigate= useNavigate();
  const dispatch= useDispatch();

  const navigateBack= async event=>{
    event.preventDefault();
    navigate('/profilePage');
   }

   const user= useSelector((state)=>state.user);
   const [data, setData] = useState({
       description:""
     });

   const handleSubmit= async()=>{
    dispatch(
        setDescription({
        description: data.description}));

const reqData={
userName: user.userName,
description: data.description
}

const res= await axios.post('http://localhost:3001/user/description/update', reqData).then((response)=>{    
console.log(response.data);

navigate(`/profilePage`)
})

}
const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };


  return (
    <div className='h-[100vh]  text-black'>
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
<span> Change Description:</span>

<Formik 
onSubmit={handleSubmit}
initialValues={
{description:''}
}
>

  <Form >

    <Field type='string' name='description' onChange={handleChange} value={data.description}  className=' mb-[0.7vh] bg-transparent border-b-[2px] rounded  text-center shadow-sky-500 shadow-xl py-4' placeholder='/description/'/>
 
  </Form>

</Formik>
<br />
<span className='text-red-500'>Delete Account</span>
</div>

    </div>
  )
}

export default Settings