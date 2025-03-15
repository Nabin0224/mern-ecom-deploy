import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { logOut } from "../../../store/auth-slice/index";





const AdminHeader = ({setOpen}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Dispatch logout action
    await dispatch(logOut());

    // Redirect to the login or register page
    navigate("/");
  };

  
  return (
   <>
   <header className='flex items-center justify-between px-4 py-3 '>
    <Button onClick={()=> setOpen(true)}   className="lg:hidden sm:block">
    <AlignJustify/>
    <span className='sr-only'>Toggle Menu</span>
    
    </Button>
    <div className="logout flex flex-1 justify-end">
      <Button onClick={handleLogout} className="inline-flex px-4 py-3 rounded-md text-sm font-medium">
      <LogOut  />
      Logout
      </Button>
    </div>

   </header>
   </>
  )
}

export default AdminHeader 