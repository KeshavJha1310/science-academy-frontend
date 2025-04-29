import React, { useEffect, useState } from 'react';
import Navbar2 from './NavbarAdmin';
import Sidebar from './AdminSideBar';
import AddTeacherForm from './AddTeacherForm';
import './AddTeachersForm.css';

const AddStudentsForm = () => {
    useEffect(() => {
        if(!localStorage.getItem('token')){
          navigate('/AdminLogin')
        }
      },[])
  return (
    <div className='AdminPanel-addteachers'>
     
    <Navbar2 />

    
        <div className='sidebar'>
          <Sidebar />
        </div>
        
          <AddTeacherForm/>
          
    </div>
  )
}

export default AddStudentsForm
