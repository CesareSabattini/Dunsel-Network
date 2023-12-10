import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './scenes/signInPage/SignIn';
import LogIn from './scenes/logInPage/LogIn';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <LogIn/>}></Route>
      <Route path='/signIn' element={<SignIn/>}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App