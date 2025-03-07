import React from 'react'
import '../MyComponents/Boards.css';
import '../MyComponents/contact.css';
import { class_10_Config ,class_11_Config, class_12_Config } from "./class_option";
import cardImage10 from '../images/class--10.jpg';
import cardImage11 from '../images/class11.jpg';
import cardImage12 from '../images/class12.jpg';
// import cardImage8 from '../images/class-8.jpg';
// import cardImage9 from '../images/class9.jpg';
// import noticeImage from '../images/logo.JPG';
import AOS from 'aos';
import 'aos/dist/aos.css';
import  { useEffect } from 'react';


const Boards = () => {
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
    const span = {
color: "black",

    };
    useEffect(()=>{
        AOS.init({duration:2000});
      },[]);
    
    const spans = {
color: "red"
    };
  return (
    <>
     <div className="notice-banner">
    <marquee behavior="scroll" direction="left"scrollamount="15" style={{marginLeft:'-700px'}}>
       **Demo lectures available Contact Us** 
      </marquee>
 </div><hr class="custom-line"/>
    <div className='classheader' id='compExam' >Higher Education & Board Examination</div><hr class="custom-line"/>
    
   
    <div className='classheader2' style={span}>Boards : <span style={spans}>SSC / HSC / CBSE / ICSE</span ></div><hr class="custom-line"/>
    <div className='classheader2' style={span}>Competetive Examination : <span style={spans}>MHT-CET / JEE-Mains / NEET </span></div><hr class="custom-line"/>
    <div className='ClassCards'>
   <div class="card" style={Class} data-aos='flip-right'>
  <img src = {cardImage10} class="card-img-top" alt="img" style={cardimg}/>
  <div class="card-body">
    <h5 class="card-title">Class X <span class="superscript">th</span></h5>
 
     <div className="d-flex align-items-start"><strong className="card-text" ><i class="fa-solid fa-clipboard-check" ></i></strong><span className="card-text" style={{fontWeight: 'bold'}}> {class_10_Config.description}</span><br/> </div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-people-group"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_10_Config.Batch_no}</span><br/></div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-school"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_10_Config.mode}</span><br/></div>
    <a href="Class_10" class="btn ac_btn">For more details</a>
  </div>
</div>
   <div class="card" style={Class} data-aos='flip-right'>
  <img src = {cardImage11} class="card-img-top" alt="img" style={cardimg}/>
<div class="card-body">
    <h5 class="card-title">Class XI <span class="superscript">th</span></h5>
    <div className="d-flex align-items-start"><strong className="card-text" ><i class="fa-solid fa-clipboard-check" ></i></strong><span className="card-text" style={{fontWeight: 'bold'}}> {class_11_Config.description}</span><br/> </div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-people-group"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_11_Config.Batch_no}</span><br/></div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-school"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_11_Config.mode}</span><br/></div>
    <a href="Class_11" class="btn ac_btn">For more details</a>
  </div>
</div>
   <div class="card" style={Class} data-aos='flip-right'>
  <img src = {cardImage12} class="card-img-top" alt="img" style={cardimg}/>
  <div class="card-body">
    <h5 class="card-title">Class XII <span class="superscript">th</span></h5>
    <div className="d-flex align-items-start"><strong className="card-text" ><i class="fa-solid fa-clipboard-check" ></i></strong><span className="card-text" style={{fontWeight: 'bold'}}> {class_12_Config.description}</span><br/> </div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-people-group"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_12_Config.Batch_no}</span><br/></div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-school"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_12_Config.mode}</span><br/></div>
    <a href="Class_12" class="btn btn-primary">For more details</a>
  </div>
</div>
 </div>
    </>
  )
}

export default Boards
