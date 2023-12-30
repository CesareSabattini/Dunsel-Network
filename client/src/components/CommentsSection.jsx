import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Formik, Form, Field } from 'formik';
import state, { setSearchedCommunity, setSearchedUser, setSearchedUserPosts } from '../state';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default  function CommentsSection(post) {
    const dispatch=useDispatch();
    const navigate= useNavigate();
    const community= useSelector((state)=>state.searchedCommunity)
  const user= useSelector((state)=>state.user)
    const [open, setOpen] = React.useState(false);
 
  const [data, setData] = React.useState({
    myComment:""
  });

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit= async()=>{
    
const reqData={
userName: user.userName,
post: post.post,
communityName: community.communityName,
text: data.myComment
}


const res= await axios.post('http://localhost:3001/community/postComment', reqData).then((response)=>{    
console.log(response);

})

const searchedCommunity= await axios.get(`http://localhost:3001/community/get/${community.communityName}`)
.then((response)=>{
  console.log(response.data);
  dispatch(
    setSearchedCommunity({
      communityData: response.data.community
    })
  )
  navigate(`/community/${community.communityName}`)
})
  }

  const handleClickUser = async (clickedUser) => {
  
   
 

     
      const res= await axios.get(`http://localhost:3001/user/${clickedUser}`)
.then((response)=>{
  console.log(response.data);
  dispatch(
    setSearchedUserPosts({
      searchedUserPosts: response.data.posts
    })
  )
   dispatch(
    setSearchedUser({
      searchedUser: response.data.user,
    },  navigate(`/user/${clickedUser}`) ))
})

    
  };

  return (
    <List 
      sx={{ width: '100%', bgcolor: 'background.black' }}
      
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
     
        <ListItemText primary="comments" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <Formik 
onSubmit={handleSubmit}
initialValues={
{description:''}
}
>

  <Form >
  <span> Add Comment</span>
    <Field type='string' name='myComment' onChange={handleChange} value={data.myComment}  className=' mb-[0.7vh] bg-transparent border-b-[2px] rounded  text-center shadow-sky-500 shadow-sm mx-3 py-1' placeholder=''/>
 
  </Form>

</Formik>

{post.post.comments.map(element=>{
    return <ListItem onClick={event=>{
        event.preventDefault();
    
     }}>

 <div> <span onClick={async event=>{
    
    event.preventDefault();
    await handleClickUser(element.userName);
 }} className='cursor-pointer'>{element.userName}</span>: <span>{element.text}</span></div>

        </ListItem>
})}
        
       
         


        </List>
      </Collapse>
    </List>
  );
}
