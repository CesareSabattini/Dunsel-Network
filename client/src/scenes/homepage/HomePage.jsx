import React from 'react'
import Navbar from '../../components/Navbar'
import CommunityPreview from '../../components/CommunityPreview'
import GitHubIcon from '@mui/icons-material/GitHub';
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setSearchedCommunity, setSearchedUser, setSearchedUserPosts } from "../../state/index";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {

  
  const dispatch = useDispatch();
  const user=useSelector((state)=>state.user);
  const posts=useSelector((state)=>state.posts);
  const communities=useSelector((state)=>state.communities);
  const navigate= useNavigate();
  const handleClick= (event)=>{
    event.preventDefault();
    console.log(communities)

  }

  const handleSearchCommunity= async (elem)=>{

 dispatch(
  setSearchedCommunity({
    communityData: elem
  })
)
   
    
        }
      

  return (
    <div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white h-[100vh]'>
        <Navbar/>
        <div className='grid grid-cols-3 h-[92vh]'>
        <div className='font-mono text-white border-r flex grid grid-rows-6 border-sky-500'>
<span className='font-mono font-bold text-xl flex justify-center items-center w-full h-full w-full  bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-t border-sky-500 '>
    My Communities</span>
    {user.communities.map((elem)=>{
      return (<div onClick={async (event)=>{
        event.preventDefault();
       console.log(elem)
        await handleSearchCommunity(elem);
        navigate(`/community/${elem.__v}`);
      }}><CommunityPreview communityName={elem.communityName}/></div>)

    })}

    


   <a href='https://github.com/CesareSabattini' className='flex justify-center items-center h-full w-full bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 '> <GitHubIcon className='mr-2'/> @CesareSabattini </a>

        </div>
        
        </div>
        
        </div>
  )
}

export default HomePage