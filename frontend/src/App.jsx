import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import Captainlogin from './pages/Captainlogin';
import CaptainSignup from './pages/CaptainSignup';
import Start from './pages/Start';
import { UserDataContext } from './context/UserContext';
import UserProtectWrapper from './pages/UserProtectWrapper';
import UserLogout from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';
const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Start/>} />
      <Route path='/login' element={<UserLogin/>} />
      <Route path='/signup' element={<UserSignup/>} />
      <Route path='/captain-login' element={<Captainlogin/>} />
      <Route path='/captain-signup' element={<CaptainSignup/>} />
      <Route path='/home' element={  <UserProtectWrapper><Home/></UserProtectWrapper> } />
      <Route path='/user/logout' element={<UserLogout/>}/>      
      <Route path='/captain/home' element={<CaptainHome/>}></Route>
    </Routes>
    </div>
  )
}

export default App
