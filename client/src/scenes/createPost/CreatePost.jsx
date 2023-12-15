import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { setPosts } from '../../state/index';


const CreatePost = () => {

    const dispatch= useDispatch();
    const navigate= useNavigate();
    const user= useSelector((state)=>state.user);
    const [data, setData] = useState({
        url:"",
        description:""
      });

    const handleSubmit= async()=>{
        dispatch(
            setPosts({
            userName: user.userName,
            url: data.url,
            description: data.description}));

const postData={
    userName: user.userName,
    description: data.description,
    url: data.url
}

const res= await axios.post('http://localhost:3001/post/create', postData).then((response)=>{    
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
  
  <div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white h-[100vh]'>    
<div className='p-10 rounded border-4 rounded-2xl shadow-sky-500 shadow-xl border-gray-800  grid grid-cols-4 grid-rows-4'>
<h1 className='flex justify-center font-bold mt-3 mb-[8vh] text-4xl col-span-4'>Create Post</h1>
  
  <div  className='h-full flex items-center justify-center col-span-4 row-start-2 '>

<Formik 
onSubmit={handleSubmit}
initialValues={
{url:'', description:''}

}
>

  <Form >

    <div className='grid grid-cols-2 grid-rows-2 gap-7'>
   <Field type='string' name='url' onChange={handleChange} value={data.url}  className=' mb-[0.7vh] bg-transparent border-b-[2px] rounded  text-center shadow-sky-500 shadow-xl py-4' placeholder='image url'/>
 
    <Field type='string' name='description' onChange={handleChange}  value={data.description}  className='mb-[0.7vh] bg-transparent border-b-[2px] rounded  bg-transparent border-b-2 text-center shadow-sky-500 shadow-xl py-4' placeholder='description'/>
    
    </div>
    <div className=' p-3 mt-10 bg-gradient-to-b from-transparent text-white font-bold rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500 border-b-[2px] border-sky-500  flex text-xl justify-center'>
    <button type="submit">
             Share
           </button>
           </div>
        
  </Form>

</Formik>
</div>
</div>
</div>
  )
}

export default CreatePost;