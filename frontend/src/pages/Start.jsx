import React from 'react'
import { Link } from 'react-router'

const Start = () => {
  return (
    <div>
       <div className=' bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center  h-screen pt-8 w-full bg-red-400 flex items-start justify-between flex-col '>
        <img  className='w-16 ml-9' src="https://www.edigitalagency.com.au/wp-content/uploads/Uber-logo-white-png-900x313.png" alt="logo" />
         <div className='bg-white py-4 px-4 w-full'>
          <h2 className='text-2xl font-bold'>Get Started With Uber</h2>
          <Link to='/login' className='flex justify-center items-center w-full bg-black text-white py-3 mt-5 rounded'>Continue</Link>
         </div>
       </div>
    </div>
  )
}

export default Start
