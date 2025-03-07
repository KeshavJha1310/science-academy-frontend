import React, { useEffect, useState } from 'react';

import Navbar2 from './NavbarAdmin';
import Sidebar from './AdminSideBar';
import AddMarksForms from './AddMarksForms';
import './AddStudentsForm.css';
import './AdminPanel.css';

const AddMarks = () => {
    useEffect(() => {
        if(!localStorage.getItem('token')){
          navigate('/AdminLogin')
        }
      },[])
  return (
    <div className='AdminPanel'>
    
       <Navbar2 />

        <div className='sidebar'>
          <Sidebar />
        </div>

          <AddMarksForms />
       
    </div>
  )
}

export default AddMarks
