import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { setPosts, setPosts2 } from '../../state/index';
import { ArrowBack, Upload } from '@mui/icons-material';
import UploadImage from '../../components/UploadImage';


const CreatePost = () => {

    const dispatch= useDispatch();
    const navigate= useNavigate();
    const user= useSelector((state)=>state.user);
    const token= useSelector(state=>state.token)
    const Posts= useSelector((state)=>state.posts)
    const [data, setData] = useState({
        url:"",
        description:""
      });
      
    const navigateBack= async event=>{
      event.preventDefault();
      navigate('/profilePage');
     }
  

    const handleSubmit= async()=>{
       

const postData={
    userName: user.userName,
    description: data.description,
    url: data.url
}

const res= await axios.post('http://localhost:3001/post/create', postData, 
{
  headers:{
    'Authorization': 'Bearer ' + token
  }
}
).then((response)=>{    
console.log(response.data);

})

const posts=await axios.get(`http://localhost:3001/post/get/${user.userName}`,
{
  headers:{
    'Authorization': 'Bearer ' + token
  }
}
).then((response)=>{

dispatch(
    setPosts2({
posts: response
    })
  )
 console.log(`POSTS: ${Posts}` )
 
})
 navigate(`/profilePage`)
    }
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
          ...data,
          [e.target.name]: value
        });
      };
  return (
  
  <div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white h-[100vh] p-[15vh] pt-[10vh]'>    

<div className='flex mb-[5vh] justify-end'><button onClick={navigateBack} ><ArrowBack className='border rounded-full shadow-lg shadow-sky-500 text-sky-500'/></button></div>
<div className='  h-full rounded border-4 rounded-2xl shadow-sky-500 shadow-xl border-gray-800  grid grid-cols-4 grid-rows-4'>
<h1 className='flex justify-center font-bold mt-10 text-4xl col-span-4'>Create Post</h1>


  

<div className='flex items-center justify-center row-start-2 col-start-2 col-span-2 cursor-pointer '>

<UploadImage/>
</div>

</div>

</div>
  )
}

export default CreatePost;