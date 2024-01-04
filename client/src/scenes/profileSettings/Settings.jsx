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
import ResponsiveAppBar from '../../components/Navbar';

const Settings = () => {
  const navigate= useNavigate();
  const dispatch= useDispatch();
  const token= useSelector(state=>state.token)

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

const res= await axios.post('https://dunsel-network-server.vercel.app/user/description/update', reqData,
{headers: {
  'Authorization': 'Bearer ' + token}
}
).then((response)=>{    
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
    <div>
      <ResponsiveAppBar/>
    <div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white h-[100vh] text-center'>
<div className='text-5xl font-bold px-10 py-10'>
Settings
</div>

<div className=''>
 <div className='font-bold text-2xl pb-4'>
  Profile's Settings:
  </div>

<span> Change Username </span>
<br />
<span> Change Password </span>
<br />


<Formik 
onSubmit={handleSubmit}
initialValues={
{description:''}
}
>

  <Form >
  <span> Change Description:</span> <br />
    <Field type='string' name='description' onChange={handleChange} value={data.description}  className=' m-[0.7vh] bg-transparent border-b-[2px] rounded  text-center shadow-sky-500 shadow-sm mx-3 py-1 break-words' placeholder=''/>
 
  </Form>

</Formik>
<br />
<span className='text-red-500'>
  Delete Account</span>
</div>

    </div>
    </div>
  )
}

export default Settings