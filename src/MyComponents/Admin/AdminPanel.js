import React, { useEffect, useState } from 'react';

import Navbar2 from './NavbarAdmin';
import Sidebar from './AdminSideBar';
import { useNavigate } from 'react-router-dom';
// import Main from './Main';
import './AdminPanel.css'

function AdminPanel() {
  const navigate = useNavigate()
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/AdminLogin')
    }
  },[])
  return (

    <div className='AdminPanel'style={{position:'absolute'}}>
     
        <Navbar2 />
      
      <div className='sidebar'>
        <Sidebar />
      </div>

    </div>

  );


}

export default AdminPanel
