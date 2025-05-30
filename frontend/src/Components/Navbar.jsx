import React, { use } from 'react'
import { useAuthStore } from '../Store/authStore.js'
import { Link } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'
import { Settings } from 'lucide-react'
import { User } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const {authUser, logOut} = useAuthStore();
  const navigate= useNavigate() 
const handleLogOut = async () => {

 await logOut()
 
}
  
  return (
    <>
<header className=' bg-base-100 border-b-3  border-base-300 bg-base-100/80 fixed w-full top-0  z-40 backdrop-blur-lg '>
  <div className='container mx-auto px-4 h-16'>
  <div className=' flex items-center justify-between h-full'>
  <div className='flex items-center gap-8'>
<Link to='/' className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
<div className='size-9 rounded-lg bg-primary/10 flex items-center justify-center'>
<MessageSquare className='size-9 text-[bronze]'/> 
</div>
<h1 className='text-lg font-bold'>Chatty</h1>
</Link>
  </div>

  <div className='flex items-center gap-2'>
<Link to={'/settings'} className={`btn btn-sm gap-2 transition-colors    rounded-lg font-medium py-0.5 px-1 text-[14px]`}>
<Settings className='size-4' />
<span className='hidden sm:inline '>Setting</span>
</Link>
{authUser && (
  <>
  <Link to={"/profile"} className = {`btn btn-sm gap-2 transition-colors   rounded-lg font-medium py-0.5 px-1 text-[14px]`}>
   <User className='size-5'/>
   <span className='hidden sm:inline'>Profile</span>
  </Link>
  <button className=' btn btn-sm flex gap-2 items-center cursor-pointer  rounded-lg font-medium py-1 px-1 text-[14px]' onClick={handleLogOut}>
    <LogOut className = 'size-5'/>
    <span className='hidden sm:inline  '>Logout</span>
  </button>
  </>
)}
 
  </div>
  </div>    
  </div>
</header>

    </>
  )
}

export default Navbar