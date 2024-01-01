import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Field } from 'formik';
import axios from 'axios';

const CreateCommunity = () => {
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const user= useSelector((state)=>state.user);
    const token= useSelector(state=>state.token)
    const [data, setData] = useState({
        communityName:"",
        communityTheme:"",
        communityDescription:""
      });
      
    const navigateBack= async event=>{
      event.preventDefault();
      navigate('/home');
     }
  

    const handleSubmit= async()=>{


const communityData={
    userName: user.userName,
    communityName: data.communityName,
    communityTheme: data.communityTheme,
    communityDescription: data.communityDescription
}

const res= await axios.post('http://localhost:3001/community/create', communityData,
{
  headers:{
    'Authorization': "Bearer " + token
  }
}
).then((response)=>{    
console.log(response.data);

    navigate(`/home`)
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

    <div className='grid grid-cols-3 grid-rows-4 h-[100vh] flex items-center '>
    <div className='font-mono text-white border flex border-sky-500 justify-center items-center col-start-2 text-xl bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20
    p-8 rounded'>
Create Community
    </div>
      
  <div  className='flex items-center justify-center col-span-4 row-start-2 mt-[10vh] '>

<Formik 
onSubmit={handleSubmit}
initialValues={
{communityName:'', communityTheme:'', communityDescription:''}
}
>

  <Form >

    <div className='grid grid-cols-2 grid-rows-2 gap-7'>
   <Field type='string' name='communityName' onChange={handleChange} value={data.communityName}  className=' mb-[0.7vh] bg-transparent border-b-[2px] rounded  text-center shadow-sky-500 shadow-xl py-4' placeholder='Community Name'/>
 
    <Field type='string' name='communityTheme' onChange={handleChange}  value={data.communityTheme}  className='mb-[0.7vh] bg-transparent border-b-[2px] rounded  bg-transparent border-b-2 text-center shadow-sky-500 shadow-xl py-4' placeholder='Theme'/>
    
    
    <Field type='string' name='communityDescription' onChange={handleChange}  value={data.communityDescription}  className='mb-[0.7vh] bg-transparent border-b-[2px] rounded  bg-transparent border-b-2 text-center shadow-sky-500 shadow-xl py-4 col-span-2' placeholder='Description'/>
    
    <div className=' p-3 bg-gradient-to-b from-transparent text-white font-bold rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500 border-b-[2px] border-sky-500  flex text-xl justify-center col-span-2'>
    <button type="submit">
             Create
           </button>
           </div>
    </div>
  
        
  </Form>

</Formik>
</div>

    </div>
    
    </div>

  )
}

export default CreateCommunity;