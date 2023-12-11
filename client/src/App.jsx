import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from './scenes/signInPage/SignIn';
import LogIn from './scenes/logInPage/LogIn';
import ProfilePage from './scenes/profilePage/ProfilePage';

const App = () => {
  const isAuth= Boolean((state)=>state.token);
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ isAuth? <ProfilePage/> : <LogIn/>}></Route>
      <Route path='/signIn' element={<SignIn/>}></Route>
      <Route path='/profilePage' element={isAuth? <ProfilePage/> : <Navigate to='/'/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App