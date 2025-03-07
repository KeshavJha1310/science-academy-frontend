import React, { useEffect, useState } from 'react';
import Navbar2 from './NavbarAdmin';
import Sidebar from './AdminSideBar';
import AddSubjectForm from './AddSubjectForm'
import './AddSubject.css';

const AddSubject = () => {
    useEffect(() => {
        if(!localStorage.getItem('token')){
          navigate('/AdminLogin')
        }
      },[])
  return (
    <div className='AdminPanel_AddSubject'>
     
    <Navbar2 />
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='addsubjectForm'>
       <AddSubjectForm/>       
        </div>
    </div>
  )
}

export default AddSubject
