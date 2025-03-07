import React,{useEffect} from "react";
import LaunchExamForm from './LaunchExamForm'
import Navbar2 from './NavbarAdmin';
import Sidebar from './AdminSideBar';
import './LaunchExam.css'
import ExamsDetails from './ExamsDetails.js'


const LaunchExam=()=>{
    useEffect(() => {
        if(!localStorage.getItem('token')){
          navigate('/AdminLogin')
        }
      },[])

      return (
        <div className='AdminPanel_LaunchExam'>  
        <Navbar2 />
            <div className='sidebar'>
              <Sidebar />
            </div>
            <div className='launchExamhForm'>
           <LaunchExamForm/>       
            </div>
            <ExamsDetails/>
        </div>
      )
}
export default LaunchExam;