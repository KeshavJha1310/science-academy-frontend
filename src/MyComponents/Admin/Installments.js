import React ,{useEffect} from "react";
import './Installments.css';
import Navbar2 from './NavbarAdmin';
import Sidebar from './AdminSideBar';

const Installments = () =>{
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/AdminLogin')
          }
    },[])

    return (
        <div className='AdminPanel_Installment'>
            <Navbar2 />
        <div className='sidebar'>
            <Sidebar />
        </div>
        </div>
    )
}
export default Installments;