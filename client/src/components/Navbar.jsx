import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import state, { setSearchedCommunity, setLogout, setSearchedUser, setSearchedUserPosts, setFeedPosts } from '../state';


const settings = ['Profile'];


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [inputCommunity, setMessage] = useState('');
    const navigate= useNavigate();
    const token= useSelector(state=>state.token);
    const user= useSelector(state=>state.user)
    const profilePhoto= useSelector((state)=>state.profilePhoto);
const dispatch= useDispatch()
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = (event) => {
      event.preventDefault();

      window.location.reload();
     
    };

    const handleCreateCommunity= ()=>{
      navigate('/community/create')
    }
const handleNavigateProfile= ()=>{
  navigate('/profilePage')
}
    const handleChange = event => {
      event.preventDefault();
      setMessage(event.target.value);
  
      console.log(inputCommunity);
    };

     const handleNavigateHome= async event=>{
      
event.preventDefault();
if(window.location.href==='http://localhost:5173/home'){
window.location.reload();
}
else{
    event.preventDefault();

    const feedPosts= await axios.get(`https://dunsel-network-server.vercel.app/community/getFeedPosts/${user.userName}`,
    {
      headers:{
        'Authorization': 'Bearer ' + token
      }
    }
    ).then((response)=>{
      console.log(response);
    dispatch(setFeedPosts({
        feedPosts: response.data
      }))
      navigate('/home');
    })
   }}

  const handleKeyDown = async event => {
  
    if (event.key === 'Enter') {
 
      event.preventDefault();
      const searchedCommunity= await axios.get(`https://dunsel-network-server.vercel.app/community/get/${inputCommunity}`,
      {
        headers:{
          'Authorization': "Bearer " + token
        }
      })
      const searchedUser= await axios.get(`https://dunsel-network-server.vercel.app/user/${inputCommunity}`,
      {
        headers:{
          'Authorization': 'Bearer ' + token
        }
      }).then((response)=>{
        console.log(response.data.user.length)
        console.log(searchedCommunity)
        
        if(response.data.user.length==0 && searchedCommunity.data.community==null){
          window.location.reload(true)
                }
        if(response.data.user.length!==0 && searchedCommunity.data.community==null){
          dispatch(
            setSearchedUserPosts({
              searchedUserPosts: response.data.posts
            })
          )
           dispatch(
            setSearchedUser({
              searchedUser: response.data.user,
            },  navigate(`/user/${inputCommunity}`) ))

        }
        
        if(searchedCommunity.data.community.length!==0){
          dispatch(
            setSearchedCommunity({
              communityData: searchedCommunity.data.community
            })
          )
          navigate(`/community/${inputCommunity}`)

        }
      })
     



    }
  };
  
    return (
        <Box sx={{ flexGrow: 1 }}  className='bg-black shadow-xl shadow-sky-500 w-full' >
        <AppBar position="static" className='bg-black'>
          <Container className='bg-black' >
            <Toolbar disableGutters>
  <Search 
  sx={{
    width:'30%'
  }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
             id="searchedCommunity"
             name="searchedCommunity"
             onChange={handleChange}
             onKeyDown={handleKeyDown}
             value={inputCommunity} type="text" 
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{
                display: { xs: 'flex' },
                flexGrow: 1,
                
                fontFamily: 'monospace',
                fontWeight: 900,
                letterSpacing: '',
                color: 'inherit',
                textDecoration: 'none',
              
              }}
            />
          </Search>

              <Typography
                variant={"h5"}
                noWrap
                component="a"
                className='justify-center'
                sx={{
                  
                  mr: 2,
                  display: { xs: 'flex' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: {xs:20, sm:30,  md:30},
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  paddingLeft: {xs:0}
                  
                }}
              >
               Dunsel Network
              </Typography>
    
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip>
                  <IconButton onClick={handleOpenUserMenu} sx={{ pr: 1 }}>
                    <Avatar src={`../src/assets/background/${profilePhoto}`} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  
                  <MenuItem key={'1'} onClick={handleNavigateProfile}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem key={'2'} onClick={handleCreateCommunity}>
                      <Typography textAlign="center">Create Community</Typography>
                    </MenuItem>
                    <MenuItem key={'3'} onClick={handleNavigateHome}>
                      <Typography textAlign="center">Home</Typography>
                    </MenuItem>
                    <MenuItem key={'4'} onClick={(event) =>{
                      event.preventDefault();
                      navigate('/settings')}}>
                      <Typography textAlign="center">Settings</Typography>
                    </MenuItem>
                    <MenuItem key={'5'} onClick={() =>{dispatch(setLogout())
    navigate('/logIn')}}>
                      <Typography textAlign="center">Log Out</Typography>
                    </MenuItem>
                    <MenuItem key={'6'} onClick={  event=>{
    event.preventDefault();
    navigate('/createPost');
    console.log(user.followed);
   }}>
                      <Typography textAlign="center">Share a post</Typography>
                    </MenuItem>
                  
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        </Box>
      );
    }
    export default ResponsiveAppBar;