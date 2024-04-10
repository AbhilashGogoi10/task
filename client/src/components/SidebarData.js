import React from 'react';
import { MdOutlineDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";

export const SidebarData = [
  
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdOutlineDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile/:id',
    icon: <CgProfile />,
    cName: 'nav-text'
    
  },
  {
    title: 'Logout',
    path: '/',
    icon: <IoMdLogOut />,
    cName: 'nav-text',
    

  },
]