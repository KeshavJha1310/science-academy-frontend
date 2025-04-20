import React from 'react';
import { useEffect, useState } from "react";
import {Link} from 'react-scroll';
import logo from '../images/logo.JPG';
import '../MyComponents/Navabar.css';
import {  Link as DomLink, useNavigate } from "react-router-dom";

const Navbar = () => {
   const navigate  = useNavigate();
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
    <nav className={`navbar navbar2 navbar-expand-lg navbar-dark ${isSticky ? "sticky" : ""}`} >
   <div>
   <img src={logo} style={{width: 40, height: 30, borderRadius: 600/ 2}}  />

  </div>
  <Link activeClass="active" to="/" spy={true} smooth={true} offset={50} duration={500}  className="navbar-brand" >Science Academy</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link activeClass="active" to="whyus" spy={true} smooth={true} offset={50} duration={500} className="nav-link">Why Us? <span className="sr-only">(current)</span></Link>
      </li>
    
      <li className="nav-item active dropdown">
        <a className="nav-link dropdown-toggle"  role="button" data-toggle="dropdown" aria-expanded="false">
        Courses
        </a>
        <div className="dropdown-menu navbar-light bg-dark" >
          <Link activeClass="active" to="compExam" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item "onMouseOver={MouseOver} onMouseOut={MouseOut}  >MHT-CET / JEE</Link>
          <Link activeClass="active" to="compExam" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >11th & 12th HSC Boards</Link>
          <Link activeClass="active" to="compExam" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >10th SSC Boards</Link>
          <Link activeClass="active" to="class_5_6" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >5th - 9th Classes</Link>
          <Link activeClass="active" to="class_1_4" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut}  >1th - 4th Classes</Link>
          <div className="dropdown-divider"></div>
          <Link activeClass="active" to="class_1_4" spy={true} smooth={true} offset={50} duration={500} className="dropdown-item"onMouseOver={MouseOver} onMouseOut={MouseOut} style={{color:"white"}} >All</Link>
        </div>
      </li>
      <li className="nav-item active">
        <Link activeClass="active" to="contact" spy={true} smooth={true} offset={50} duration={500} className="nav-link" >Contact Us</Link>
      </li>
      <li className="nav-item active">
        <Link activeClass="active" to="noticeborad" spy={true} smooth={true} offset={50} duration={500} className="nav-link" >NoticeBoard</Link>
      </li>
      <li className="nav-item active">
        <Link activeClass="active" to="whyus" spy={true} smooth={true} offset={50} duration={500} className="nav-link"  >About Us</Link>
      </li>
      <div className="Alignment" >
      {
          localStorage.getItem('token')?<div><button className="btn btn-sm btn-outline-danger" onClick={()=>{
            localStorage.clear()
            navigate('/')
          }} >Logout</button> <DomLink to="/Admin/AdminPanel" className="btn btn-sm btn-outline-danger"   >Admin Panel</DomLink>  </div>:  <DomLink to="/AdminLogin" className="btn btn-sm btn-outline-danger " >Admin Login</DomLink> 
        }
   </div>
    </ul>
   
  </div>
</nav>
    </>
  )
}

export default Navbar
