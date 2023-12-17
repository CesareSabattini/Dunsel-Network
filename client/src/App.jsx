import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from './scenes/signInPage/SignIn';
import LogIn from './scenes/logInPage/LogIn';
import ProfilePage from './scenes/profilePage/ProfilePage';
import Settings from './scenes/profileSettings/Settings';
import UserPage from './scenes/userPage/UserPage';
import CreatePost from './scenes/createPost/CreatePost';
import NullUser from './scenes/nullUser/NullUser';
import LandingPage from './scenes/landingPage/LandingPage';
import HomePage from './scenes/homepage/HomePage';

const App = () => {
  const isAuth= Boolean((state)=>state.token);
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/home' element={<HomePage/>}></Route>
      <Route path='/signIn' element={<SignIn/>}></Route>
      <Route path='/logIn' element={<LogIn/>}></Route>
      <Route path='/profilePage' element={isAuth? <ProfilePage/> : <Navigate to='/'/>}></Route>
      <Route path='/settings' element={<Settings/>}></Route>
      <Route path='/settings' element={<Settings/>}></Route>
      <Route path='/user/:userName' element={<UserPage/>}></Route>
      <Route path='/createPost' element={<CreatePost/>}></Route>
      <Route path='/nullUser' element={<NullUser/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App