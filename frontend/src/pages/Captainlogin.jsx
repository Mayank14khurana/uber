import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData,setCaptainData]=useState({});
  const navigate=useNavigate()
  const {captain,setCaptain} =React.useContext(CaptainDataContext)
  const submitHandler = async (e) => {
    e.preventDefault();
    setCaptainData({
      email:email, 
      password:password
    })
     const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,captainData)
     if(response.status==200){
      const data=response.data
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate(('/catain/home'))
     }
    setEmail('');
    setPassword('');
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img src="https://tse4.mm.bing.net/th?id=OIP.QpKkCIDWTCjLjWpm2fydIwHaEK&pid=Api&P=0&h=180" className='w-20 mb-5' alt="logo" />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className='text-lg mb-2 font-medium'>What's your email</h3>
          <input type="email" required placeholder='email@exampla.com' className='rounded bg-[#eeeeee] px-4 border w-full text-lg placeholder:text-base py-2 mb-7' value={email} onChange={(e) => setEmail(e.target.value)} />
          <h3 className='text-lg mb-2 font-medium'>Enter password</h3>
          <input type="password" required placeholder='password' className='rounded bg-[#eeeeee] px-4 border w-full text-lg placeholder:text-base py-2 mb-7' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='rounded-lg bg-[#111] text-white font-semibold  px-4 border w-full text-lg   py-2 mb-3  placeholder:text-base ' >Login</button>
        </form>
        <p className='text-center'> Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link to='/login' className='rounded-lg bg-[#d5622d] text-white font-semibold flex items-center justify-center px-4 border w-full text-lg   py-2 mb-5  placeholder:text-base ' >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
