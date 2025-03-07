import React from 'react'
import '../MyComponents/Class.css';
import cardImage1 from '../images/class-1.jpg';
import cardImage2 from '../images/class-2.jpg';
import cardImage3 from '../images/class3.jpg';
import cardImage4 from '../images/class-4.jpg';
import { class_1_Config ,class_2_Config, class_3_Config ,class_4_Config} from "./class_option";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
//import { Link } from 'react-scroll';
import {  Link } from "react-router-dom";

const Class = () => {
    const Class = {
        maxWidth: '400px',
        marginRight: '0px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)',
        borderRadius: '8px',
        marginLeft: '0px',
        marginBottom: '0px',
       
    };
    const cardimg ={
        
        maxWidth: '400px',
        maxHeight: '300px',
    };
    useEffect(()=>{
        AOS.init({duration:2000});
      },[]);
  return (
    <>
      {/* <Router> */}
      <div className="notice-banner">
    <marquee behavior="scroll" direction="left"scrollamount="15" style={{marginLeft:'-700px'}}>
       **Demo lectures available Contact Us** 
      </marquee>
 </div>
 <hr class="custom-line"/>
    <div className='classheader' id='class_5_6' >Primary Education</div><hr class="custom-line"/>
    <div className='ClassCards'>
   <div class="card" style={Class} data-aos='flip-right'>
  <img src = {cardImage1} class="card-img-top" alt="Class 1" style={cardimg}/>
  <div class="card-body">
    <h5 class="card-title">Class I <span class="superscript">st</span></h5>
    <div className="d-flex align-items-start"><strong className="card-text" ><i class="fa-solid fa-clipboard-check" ></i></strong><span className="card-text" style={{fontWeight: 'bold'}}> {class_1_Config.description}</span><br/> </div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-people-group"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_1_Config.Batch_no}</span><br/></div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-school"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_1_Config.mode}</span><br/></div>    <Link to="/Class_1" class="btn btn-primary">For more details</Link>
  </div>
</div>
   <div class="card" style={Class} data-aos='flip-right'>
  <img src = {cardImage2} class="card-img-top" alt="img" style={cardimg}/>
  <div class="card-body">
    <h5 class="card-title">Class II <span class="superscript">nd</span></h5>
    <div className="d-flex align-items-start"><strong className="card-text" ><i class="fa-solid fa-clipboard-check" ></i></strong><span className="card-text" style={{fontWeight: 'bold'}}> {class_2_Config.description}</span><br/> </div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-people-group"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_2_Config.Batch_no}</span><br/></div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-school"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_2_Config.mode}</span><br/></div>    <Link to="/Class_2" class="btn btn-primary">For more details</Link>
  </div>
</div>
   <div class="card" style={Class} data-aos='flip-right'>
  <img src = {cardImage3} class="card-img-top" alt="img" style={cardimg}/>
  <div class="card-body">
    <h5 class="card-title">Class III <span class="superscript">rd</span></h5>
    <div className="d-flex align-items-start"><strong className="card-text" ><i class="fa-solid fa-clipboard-check" ></i></strong><span className="card-text" style={{fontWeight: 'bold'}}> {class_3_Config.description}</span><br/> </div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-people-group"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_3_Config.Batch_no}</span><br/></div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-school"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_3_Config.mode}</span><br/></div>    <Link to="/Class_3" class="btn btn-primary">For more details</Link>
  </div>
</div>
   <div class="card" style={Class} data-aos='flip-right'>
  <img src = {cardImage4} class="card-img-top" alt="img" style={cardimg}/>
  <div class="card-body">
    <h5 class="card-title">Class IV <span class="superscript">th</span></h5>
    <div className="d-flex align-items-start"><strong className="card-text" ><i class="fa-solid fa-clipboard-check" ></i></strong><span className="card-text" style={{fontWeight: 'bold'}}> {class_4_Config.description}</span><br/> </div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-people-group"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_4_Config.Batch_no}</span><br/></div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-school"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}>{class_4_Config.mode}</span><br/></div>   
      <Link to="/Class_4" class="btn btn-primary">For more details</Link>
  </div>
</div>
</div>
    </>
  )
}

export default Class
