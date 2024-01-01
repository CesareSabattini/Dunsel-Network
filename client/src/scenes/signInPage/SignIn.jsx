import React from 'react'
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';


const SignIn = () => {

    const navigate= useNavigate();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        userName:"",
        password:"",
        email:""
      });

      const handleChange = (e) => {
        const value = e.target.value;
        setData({
          ...data,
          [e.target.name]: value
        });
      };
    
      const handleSubmit = async (e) => {
  
        const userData = {
          firstName: data.firstName,
          lastName: data.lastName,
          userName: data.userName,
          password: data.password,
          email: data.email

        };
        try{const res= await axios.post("http://localhost:3001/user/signIn", userData)
        navigate('/logIn');
      }catch(err){
window.location.reload(true);
alert(err.response.data.error)
        }
          
        };

    

  return (
    <div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white h-[100vh]'>
      
     <div className='h-full flex items-center justify-center'>

<div className='p-10 rounded border-4 rounded-2xl shadow-sky-500 shadow-xl border-gray-800'>
  <h1 className='flex justify-center font-bold mt-3 mb-[8vh] text-4xl'>Sign In</h1>

<Formik 
onSubmit={handleSubmit}
initialValues={
{userName:'', password:''}
}
>
  <Form>
    <div  className='grid grid-cols-2 gap-7 mx-3'>
   <Field type='string' name='firstName' value={data.firstName}  onChange={handleChange} className='  mb-[0.7vh] bg-transparent border-b-[2px] rounded py-[1px] text-center shadow-sky-500 shadow-md py-4 border-y border-gray-500' placeholder='First Name'/>
 
    <Field type='string' name='lastName' value={data.lastName}  onChange={handleChange} className='  mb-[0.7vh] bg-transparent border-b-[2px] rounded py-[1px] text-center shadow-sky-500 shadow-md py-4 border-y border-gray-500' placeholder='Last Name'/>
  
    <Field type='string' name='userName' value={data.userName}  onChange={handleChange} className='  mb-[0.7vh] bg-transparent border-b-[2px] rounded py-[1px] text-center shadow-sky-500 shadow-md py-4 border-y border-gray-500' placeholder='Username'/>
  
    <Field type='password' name='password' value={data.password}  onChange={handleChange} className='mb-[0.7vh] bg-transparent border-b-[2px] rounded py-[1px] bg-transparent border-b-2 text-center shadow-sky-500 shadow-md py-4 border-y border-gray-500' placeholder='Password'/>
    
    
    <Field type='text' name='email' value={data.email}  onChange={handleChange} className='mb-[0.7vh] bg-transparent border-b-[2px] rounded py-[1px] bg-transparent border-b-2 text-center shadow-sky-500 shadow-md py-4 col-span-2 border-y border-gray-500' placeholder='Email'/>

 
    </div>
<div className=' mt-10 font-bold text-2xl flex justify-center'>
    <button type="submit" className=' p-3  bg-gradient-to-b from-transparent text-white font-bold rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500 border-b-[2px] border-sky-500 ' >
             Submit
           </button>
           </div>
  </Form>

</Formik>
<a href='/logIn' className='text-sky-500 flex justify-center pt-8 pb-0 text-sm hover:underline'>Do you have an account? Log In</a>
</div>
     </div>
      
      </div>
  )
}

export default SignIn