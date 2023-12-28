import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";


const LogIn = () => {
  const navigate= useNavigate();
  const dispatch = useDispatch();


  const [data, setData] = useState({
      userName:"",
      password:""
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
        userName: data.userName,
        password: data.password

      };

      axios.post("http://localhost:3001/user/logIn", userData).then((response) => {
          console.log(response.data);
          
if(response.status==200){
  dispatch(
    setLogin({
      user: response.data.user,
      token: response.token,
      posts: response.data.posts,
      profilePhoto: response.data.user.profilePhoto,
      communities: response.data.communities
    })
  );
  console.log( response.data.communities);
  navigate("/profilePage");}
  else{
    navigate('/')
  }
        });
      
        
      };

  

  return (
    <div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white h-[100vh]'>
      
     <div className='h-full flex items-center justify-center'>

<div className='p-10 rounded border-4 rounded-2xl shadow-sky-500 shadow-xl border-gray-800'>
  <h1 className='flex justify-center font-bold mt-3 mb-[8vh] text-4xl'>Log In</h1>
<Formik 
onSubmit={handleSubmit}
initialValues={
{userName:'', password:''}

}
>
  <Form >
    <div className='grid grid-cols-1 grid-rows-2 gap-7'>
   <Field type='string' name='userName' onChange={handleChange} value={data.userName}  className=' mb-[0.7vh] bg-transparent border-b-[2px] rounded  text-center shadow-sky-500 shadow-xl py-4' placeholder='Username'/>
 
    <Field type='password' name='password' onChange={handleChange} value={data.password} className='mb-[0.7vh] bg-transparent border-b-[2px] rounded  bg-transparent border-b-2 text-center shadow-sky-500 shadow-xl py-4' placeholder='Password'/>
    
    </div>
    <div className=' p-3 mt-10 bg-gradient-to-b from-transparent text-white font-bold rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500 border-b-[2px] border-sky-500  flex text-xl justify-center'>
    <button type="submit">
             Submit
           </button>
           </div>
  </Form>

</Formik>
<a href='/signIn' className='text-sky-500 flex justify-center pt-8 pb-0 text-sm hover:underline'>Don't have an account? Sign In</a>
</div>

     </div>
      
      </div>
  )
}

export default LogIn