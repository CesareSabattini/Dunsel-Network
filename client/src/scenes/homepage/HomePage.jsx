import React from 'react'
import Navbar from '../../components/Navbar'
import CommunityPreview from '../../components/CommunityPreview'
import GitHubIcon from '@mui/icons-material/GitHub';
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setSearchedCommunity, setSearchedUser, setSearchedUserPosts } from "../../state/index";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';
import CommunityPost from '../../components/CommunityPost';


const HomePage = () => {

  
  const dispatch = useDispatch();
  const user=useSelector((state)=>state.user);
  const posts=useSelector((state)=>state.posts);
  
  const feedPosts= useSelector((state)=>state.feedPosts);
  const navigate= useNavigate();
  const handleClick= (event)=>{
    event.preventDefault();
    

  }
  const token= useSelector((state)=>state.token)
  const handleSearchCommunity= async (elem)=>{

  
    const searchedCommunity= await axios.get(`http://localhost:3001/community/get/${elem.communityName}`,
    {
      headers: {
      'Authorization': 'Bearer ' + token
    }
    } 
    ).then(
      (response)=>{
        dispatch(
          setSearchedCommunity({
            communityData: response.data.community
          })
        )
        
      }
    )


   
    
        }
      

  return (
    <div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white h-[100vh]'>
        <Navbar/>
        <div className='grid grid-cols-3 h-[91vh]'>
        <div className='font-mono text-white border-r flex border-sky-500 grid grid-cols-1 h-[92vh] '>
<div className='font-mono font-bold text-xl flex justify-center items-center w-full h-full w-full bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-t border-sky-500 border-b-4 '>
    My Communities</div>
    <div className='h-[55vh] overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-sky-500 mb-0 border-b-4 border-sky-500 shadow-md shadow-black'>
    {user.communities.map((elem)=>{
      return (<div onClick={async (event)=>{
        event.preventDefault();
     
        await handleSearchCommunity(elem);
        navigate(`/community/${elem.communityName}`);
      }} className='mb-2 shadow-md shadow-black h-[15vh] border-r border-l border-sky-500 mx-2 mt-1' key={elem._id}><CommunityPreview communityName={elem.communityName} /></div>)

    })}

</div>
<div className='h-[0vh] flex items-center justify-center bg-red-500 cursor-pointer ml-3 ' onClick={event=>{
  event.preventDefault();
  navigate('/profilePage')
}}> <SettingsIcon className='mr-3'/> Manage Communities</div>

   <a href='https://github.com/CesareSabattini' className='flex justify-center items-center bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 text-sm shadow-t-md shadow-black'> <GitHubIcon className='mr-2'/> @CesareSabattini </a>

        </div>
        
        <div className='col-span-2 flex justify-center'>
         <div className='h-[90vh] overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-sky-600'>
         {feedPosts.map((elem)=>{
          return <div className='text-center pt-5'>
           <div className='font-mono flex items-center justify-center bg-sky-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-sky-500 px-3 mx-4 rounded py-1'>{elem.communityName}</div> 
          <CommunityPost post={elem}/>
          </div>
         })}
         </div>
          
        </div>
        </div>
        
        </div>
  )
}

export default HomePage