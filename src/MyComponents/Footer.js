import React from 'react';
import logo from '../images/logo.JPG';
// import '../MyComponents/Navabar.css';
import '../MyComponents/contact.css';
import {Link} from 'react-scroll';
import { contactConfig } from "./content_option";
import '../MyComponents/footer.css';

const Footer = () => {
  function MouseOver(event) {
    event.target.style.color = 'black';
  }
 
  function MouseOut(event){
    event.target.style.color="white";
  }
  return (
 <div className='Footer bg-dark flex'>
  <div className='container'>
    
    <div className='row'>
    <hr className="t_border my-4 ml-0 text-left" />
    <div className='col-md-6 col-lg-5 col-12'>
    
   <img src={logo} style={{width: 60, height: 60, borderRadius: 600/ 2 , marginRight:'15px'}}  />


  <a className="navbar-brand" href="#"> Science Academy</a>
   <hr className="t_border my-4 ml-0 text-left" />
  <p style={{  margin: '30px auto 0px' , color:'white', }}> Your premier offline tuition center for science education.
     Experienced educators, personalized learning, and practical knowledge.
     Unlock your potential in Physics, Chemistry, Biology, and Mathematics. 
     Prepare for exams and pursue your dream career.<span style={{fontWeight:'bold', color:'red',fontSize:'20px'}}> Contact us for a consultation.</span><br/>
      {/* <span style={{fontWeight:'bold', color:'red',fontSize:'20px'}}>Follow us on social media for updates.</span> */}</p>
      <div class="social-icons">
              <a href="https://www.facebook.com/share/1LR1dcNBxX/" class="social-icon">
            
<i class="fa-brands fa-facebook"></i>
              </a>
              <a href="https://wa.me/8149397762" class="social-icon whatsapp">
      <i class="fa-brands fa-whatsapp"></i>
    </a>
              <a href="https://www.instagram.com/scienceacademy354" class="social-icon instagram">
              <i class="fa-brands fa-instagram" style={{color: "#950451,"}}></i>
              </a>
              <a href="https://goo.gl/maps/uQnugPNm3JL5SajE9" class="social-icon">
           <i class="fas fa-map-marked-alt"></i>
</a>
            </div>
    </div>
   
    <div className='col-md-6 col-lg-3 col-12'>
      <h5  className="navbar-quick" style={{color:' #f60838'}} >Quick Links</h5>
      <hr className="t_border my-4 ml-0 text-left" />
      <ul>

      <li className="nav-item active">
      <Link activeClass="active" to="whyus" spy={true} smooth={true} offset={50} duration={500} className="nav-link">Why Us? <span className="sr-only">(current)</span></Link>
      </li>

      <li className="nav-item active dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
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

      </ul>
    </div>

    <div className='col-md-6 col-lg-4 col-12'>

    <h5  className="navbar-quick" style={{color:' #f60838'}} >Contact Info</h5>
      <hr className="t_border my-4 ml-0 text-left" />
      <ul>

              <strong className="email-label" ><i class="fa-solid fa-envelope"></i></strong>{" "}
            <a className="email-id" href={`mailto:${contactConfig.YOUR_EMAIL}`}>
              {contactConfig.YOUR_EMAIL}
            </a>
            <br />
            <br />
            
            {contactConfig.hasOwnProperty("YOUR_FONE") ? (
              <p>
                <strong className="email-label"><i class="fa-solid fa-phone"></i></strong><span className="email-id"><a href={`tel:${contactConfig.YOUR_FONE}`}>{contactConfig.YOUR_FONE}</a></span><br/><br/>  
                <a href="https://goo.gl/maps/uQnugPNm3JL5SajE9" class="social-icon">
                <strong className="email-label"><i class="fas fa-map-marked-alt"></i></strong><span className="email-id"> {contactConfig.location}</span>
</a>
              </p>
            ) : (
              ""
            )} 
             
            <br />
      </ul>
    </div>
    <hr className="t_border my-4 ml-0 text-left" />
    </div>
  </div>
 </div>
  )
}

export default Footer
