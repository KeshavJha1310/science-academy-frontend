import React, { useEffect, useState } from 'react';

import Navbar2 from './NavbarAdmin';
import Sidebar from './AdminSideBar';
import AddStudentForm from './AddStudent';
import './AddStudentsForm.css';
import './AdminPanel.css';

const AddStudentsForm = () => {
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
        
          <AddStudentForm />
       
     
    </div>
  )
}

export default AddStudentsForm
