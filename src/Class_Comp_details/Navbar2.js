import React from 'react';
import { useEffect, useState } from "react";
import {Link as ScrollLink} from 'react-scroll';
import { useLocation } from 'react-router-dom';
import {Link as RouterLink} from 'react-router-dom'; 
import logo from '../images/logo.JPG';
import './Navabar2.css';
import {  Link as DomLink } from "react-router-dom";


const Navbar2 = () => {
  
    function MouseOver(event) {
        event.target.style.color = 'black';
      }
     
      function MouseOut(event){
        event.target.style.color="white";
      }

      const [isSticky, setSticky] = useState(false);

      const checkStickiness = () => {
        setSticky(window.scrollY > 0);
      };
    
      useEffect(() => {
        window.addEventListener("scroll", checkStickiness);
    
        // Cleanup function to remove the event listener
        return () => {
          window.removeEventListener("scroll", checkStickiness);
        };
      }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount
 

  return (
    <>
    {/* <Navbar bg="dark" data-bs-theme="dark" className={`navbar navbar-expand-lg navbar-dark ${isSticky ? "sticky" : ""}`} > */}
    <nav className={`navbar navbar2 navbar-expand-lg navbar-dark ${isSticky ? "sticky" : ""}`}  >
   <div>
    <img src={logo} style={{width: 40, height: 30, borderRadius: 600/ 2}}  />

  </div>
  <RouterLink  to="/"  className="navbar-brand" >Science Academy</RouterLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <RouterLink  to="/"  className="nav-link">Home <span className="sr-only">(current)</span></RouterLink>
      </li>
    
      <li className="nav-item active dropdown">
        <a className="nav-link dropdown-toggle"  role="button" data-toggle="dropdown" aria-expanded="false">
        MHT-CET / JEE
        </a>
        <div className="dropdown-menu navbar-light bg-dark" >
        <RouterLink  to="/Class_11" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >Class 11</RouterLink>
          <RouterLink  to="/Class_12" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >Class 12</RouterLink>
        </div>
      </li>
      <li className="nav-item active dropdown">
        <a className="nav-link dropdown-toggle"  role="button" data-toggle="dropdown" aria-expanded="false">
        Primary Section
        </a>
        <div className="dropdown-menu navbar-light bg-dark" >
        <RouterLink  to="/Class_1" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >Class 1</RouterLink>
            <RouterLink  to="/Class_2" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >Class 2</RouterLink>
            <RouterLink  to="/Class_3" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >Class 3</RouterLink>
            <RouterLink  to="/Class_4" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >Class 4</RouterLink>
        </div>
      </li>
      <li className="nav-item active dropdown">
        <a className="nav-link dropdown-toggle"  role="button" data-toggle="dropdown" aria-expanded="false">
        Secondary Section
        </a>
        <div className="dropdown-menu navbar-light bg-dark" >
        <RouterLink  to="/Class_5" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >Class 5</RouterLink>
            <RouterLink  to="/Class_6" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >Class 6</RouterLink>
            <RouterLink  to="/Class_7" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >Class 7</RouterLink>
            <RouterLink  to="/Class_8" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >Class 8</RouterLink>
            <RouterLink  to="/Class_9" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >Class 9</RouterLink>
        </div>
      </li>

    {/* <li className="nav-item active">
        <ScrollLink activeClass="active" to="contact" spy={true} smooth={true} offset={50} duration={500} className="nav-link" >Fees Struction</ScrollLink>
      </li>
      <li className="nav-item active">
        <ScrollLink activeClass="active" to="noticeborad" spy={true} smooth={true} offset={50} duration={500} className="nav-link" >Timing</ScrollLink>
      </li> */}
      <li className="nav-item active">
        <ScrollLink  activeClass="active" to="contact" spy={true} smooth={true} offset={50} duration={500} className="nav-link">Contact Us</ScrollLink>
      
      </li>
      <div className="Alignment" >
     
      {
          localStorage.getItem('token')?<div><button className="btn btn-sm btn-outline-danger" onClick={()=>{
            localStorage.clear()
            navigate('/')
          }} >Logout</button> <DomLink to="/Admin/AdminPanel" className="btn btn-sm btn-outline-danger "  onClick={() => window.history.back()}>Admin Panel</DomLink>  </div>:  <DomLink to="/AdminLogin" className="btn btn-sm btn-outline-danger " >Admin Login</DomLink> 
        }

     </div>
      {/* <div className="Alignment" >
     
    <button className="btn btn-sm btn-outline-danger " type="submit">Stuents Login</button>

     </div> */}
    </ul>
   
  </div>
{/* </Navbar> */}
</nav>
    </>
  )
}

export default Navbar2
