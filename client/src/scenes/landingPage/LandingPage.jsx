import React from 'react'

const LandingPage = () => {
  return (
    <div className='h-[100vh] bg-black'>
<div className='text-white flex items-center justify-center '>
  <span className='border flex items-center justify-center mt-20 rounded p-10 font-bold text-4xl'>Dunsel Network</span>  

</div>
<div className='text-white flex items-center justify-center '>
<a href='/signIn' className='border flex items-center justify-center mt-5 rounded py-5 font-bold text-lg px-[20vh]' >Sign In</a>
</div>
<div className='text-white flex items-center justify-center '>
<a href='/logIn' className='border flex items-center justify-center mt-5 rounded py-5 font-bold text-lg px-[20vh]' >Log In</a>
</div>
    </div>
  )
}

export default LandingPage