import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPosts, setPosts2 } from '../state';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UploadImage = () => {
    
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const user= useSelector((state)=>state.user);
    const token= useSelector(state=>state.token)

    const [uploadedFiles, setUploadedFiles] = useState([]);
    
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: async (acceptedFiles) => {
        setUploadedFiles(acceptedFiles);
        console.log(acceptedFiles)

       
        const postData={
            userName: user.userName,
            description:'yo',
            url: acceptedFiles[0].name
        }

        const res= await axios.post('http://localhost:3001/post/create', postData, 
        {
          headers:{
            'Authorization': 'Bearer ' + token
          }
        }
        ).then((response)=>{    
            console.log(response.data);
            dispatch(
              setPosts2({ 
                  posts: response.data
              })
          )
                navigate(`/profilePage`)
            })
      },
    });
    
    return (
      <div {...getRootProps()} className='border rounded-xl py-8 px-10 border-sky-500 text-gray-400'>
        <input {...getInputProps()} />
        <p>Drag and drop files here or click to browse.</p>
        <ul>
          {uploadedFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </div>
    );
  
}

export default UploadImage