import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProfilePhoto } from '../state';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Avatar } from '@mui/material';

const ProfileImage = () => {
    
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const user= useSelector((state)=>state.user);
    const token= useSelector((state)=>state.token)
    const profilePhoto= useSelector((state)=>state.profilePhoto);

    const [uploadedFiles, setUploadedFiles] = useState([]);
    
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: async (acceptedFiles) => {
        setUploadedFiles(acceptedFiles);
        console.log(acceptedFiles)

        dispatch(
            setProfilePhoto({ 
            
                profilePhoto: acceptedFiles[0].name,
               
            })
        )
        const imageData={
            userName: user.userName,
            url: acceptedFiles[0].name
        }

        dispatch(
            setProfilePhoto({
            profilePhoto: acceptedFiles[0].name,
            }));
            console.log(profilePhoto)

        const res= await axios.post('http://localhost:3001/user/setProfilePhoto', imageData, 
        {
          headers:{
            'Authorization': 'Bearer ' + token
          }
        }
        ).then((response)=>{    
            console.log(response.data);
            
                navigate(`/profilePage`)
            })
      },
    });
    
    return (
      <div {...getRootProps()} className=''>
        <input {...getInputProps()} />
        <Avatar src={`./src/assets/background/${profilePhoto}`}
        sx={{
          height:'15vh',
          width:'15vh',
          cursor:'pointer'
        }}
        className='rounded-full h-[15vh] cursor-pointer' />
     
     
      </div>
    );
  
}

export default ProfileImage