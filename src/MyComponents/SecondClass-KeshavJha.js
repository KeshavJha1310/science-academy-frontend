import React from 'react'
import '../MyComponents/Class.css';
import cardImage5 from '../images/class-5.jpg';
import cardImage6 from '../images/class-6.jpg';
import cardImage7 from '../images/class7.jpg';
import cardImage8 from '../images/class-8.jpg';
import cardImage9 from '../images/class9.jpg';
//import noticeImage from '../images/logo.JPG';
import { class_5_Config ,class_6_Config, class_7_Config ,class_8_Config,class_9_Config} from "./class_option";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRef, useEffect } from 'react';


const SecondClass = () => {
    const Class = {
        maxWidth: '400px',
        marginRight: '0px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)',
        borderRadius: '8px',
        // marginLeft: '5px',
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
      <div className="notice-banner">
    <marquee behavior="scroll" direction="left"scrollamount="15" style={{marginLeft:'-700px'}}>
       **Demo lectures available Contact Us** 
      </marquee>
 </div>
 <hr class="custom-line"/>
    <div className='classheader' id='class_5_6' >Secondary Education</div><hr class="custom-line"/>
    <div className='ClassCards'>
   <div class="card" style={Class} data-aos='flip-right'>
  <img src = {cardImage5} class="card-img-top" alt="img" style={cardimg}/>
  <div class="card-body">
    <h5 class="card-title">Class V <span class="superscript">th</span></h5>
    <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-clipboard-check" ></i></strong><span className="card-text" style={{fontWeight: 'bold'}}> {class_5_Config.description}</span><br/> </div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-people-group"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_5_Config.Batch_no}</span><br/></div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-school"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_5_Config.mode}</span><br/></div>
    <a href="Class_5" class="btn btn-primary">For more details</a>
  </div>
</div>
   <div class="card" style={Class} data-aos='flip-right'>
  <img src = {cardImage6} class="card-img-top" alt="img" style={cardimg}/>
  <div class="card-body">
    <h5 class="card-title">Class VI <span class="superscript">th</span></h5>
    <div className="d-flex align-items-start"><strong className="card-text" ><i class="fa-solid fa-clipboard-check" ></i></strong><span className="card-text" style={{fontWeight: 'bold'}}> {class_6_Config.description}</span><br/> </div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-people-group"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_6_Config.Batch_no}</span><br/></div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-school"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_6_Config.mode}</span><br/></div>
    <a href="Class_6" class="btn btn-primary">For more details</a>
  </div>
</div>
   <div class="card" style={Class} data-aos='flip-right'>
  <img src = {cardImage7} class="card-img-top" alt="img" style={cardimg}/>
  <div class="card-body">
    <h5 class="card-title">Class VII <span class="superscript">th</span></h5>
    <div className="d-flex align-items-start"><strong className="card-text" ><i class="fa-solid fa-clipboard-check" ></i></strong><span className="card-text" style={{fontWeight: 'bold'}}> {class_7_Config.description}</span><br/> </div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-people-group"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_7_Config.Batch_no}</span><br/></div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-school"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_7_Config.mode}</span><br/></div>
    <a href="Class_7" class="btn btn-primary">For more details</a>
  </div>
</div>

   <div class="card" style={Class} data-aos='flip-right'>
  <img src = {cardImage8} class="card-img-top" alt="img" style={cardimg}/>
  <div class="card-body">
    <h5 class="card-title">Class VIII <span class="superscript">th</span></h5>
    <div className="d-flex align-items-start"><strong className="card-text" ><i class="fa-solid fa-clipboard-check" ></i></strong><span className="card-text" style={{fontWeight: 'bold'}}> {class_8_Config.description}</span><br/> </div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-people-group"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_8_Config.Batch_no}</span><br/></div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-school"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_8_Config.mode}</span><br/></div>
    <a href="Class_8" class="btn btn-primary">For more details</a>
  </div>
</div>
   <div class="card" style={Class} data-aos='flip-right'>
  <img src = {cardImage9} class="card-img-top" alt="img" style={cardimg}/>
  <div class="card-body">
    <h5 class="card-title">Class IX <span class="superscript">th</span></h5>
    <div className="d-flex align-items-start"><strong className="card-text" ><i class="fa-solid fa-clipboard-check" ></i></strong><span className="card-text" style={{fontWeight: 'bold'}}> {class_9_Config.description}</span><br/> </div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-people-group"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_9_Config.Batch_no}</span><br/></div>
     <div className="d-flex align-items-start"><strong className="card-text"><i class="fa-solid fa-school"></i></strong><span className="card-text"  style={{fontWeight: 'bold'}}> {class_9_Config.mode}</span><br/></div>
    <a href="Class_9" class="btn btn-primary">For more details</a>
  </div>
</div>
</div>
    </>
  )
}

export default SecondClass
