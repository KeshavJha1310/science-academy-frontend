import React, { useEffect, useState } from 'react';
import Navbar2 from './NavbarAdmin';
import Sidebar from './AdminSideBar';
import AddNoticeForm from './AddNoticeForm';
// import TeacherList from './TeacherList'
import './AddStudentsForm.css';

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
        
          <AddNoticeForm />
      
     
    </div>
  )
}

export default AddStudentsForm
