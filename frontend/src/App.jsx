import React, { useState,useEffect } from 'react'
import {Route, Routes, Navigate, useNavigate} from "react-router-dom"
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import SettingsPage from './Pages/SettingsPage'
import ProfilePage from './Pages/ProfilePage'
import Navbar from './Components/Navbar'
import {useAuthStore} from './Store/authStore'
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from './Store/themeStore'
import { setNavigator } from './lib/navigation'


const App = () => {
 const {authUser, isCheckingAuth, checkAuth } = useAuthStore()
 const {theme, setTheme}= useThemeStore()
const navigate = useNavigate()
useEffect(()=>{
  setNavigator(navigate);
})
 useEffect(() => {
 
checkAuth()


 },[checkAuth])
 

if(/*isCheckingAuth && !authUser*/ false) 
  return (
<div className='flex items-center justify-center h-screen'>
  <Loader className='size-10 animate-spin '/> 
</div>
  );
  


  return (
    <div data-theme={theme} className='min-h-screen'>   
      <Toaster/>
    {authUser ? <Navbar/> : '' }
   


<Routes>
  <Route path='/' element={authUser ?<HomePage/>: <Navigate to='/login'/> }/>
  <Route path='/signup' element={!authUser?<SignupPage/>: <Navigate to='/'/> }/>
  <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to='/'/>}/>
  <Route path='/settings' element={authUser? <SettingsPage/>:<Navigate to='/login'/>}/>
  <Route path='/profile' element={authUser? <ProfilePage/>: <Navigate to='/login'/>}/>
  
</Routes>



    </div>
  )
}

export default App