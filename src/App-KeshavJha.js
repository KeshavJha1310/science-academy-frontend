//import { useSpring, animated } from 'react-spring';
import React, { useState ,useRef, useEffect } from 'react';
import './App.css';
import './MyComponents/notice.css';
import './MyComponents/secondClass.css';
import noticeImage from './images/logo.JPG';
import noticeImage2 from './images/5bcd6fef-0d62-434a-af23-d331077c2616.jpg';
import noticeImage1 from './images/slide1.JPG';
import Footer from './MyComponents/Footer';
import Header from './MyComponents/Header';
import Class from './MyComponents/Class';
import SecondClass from './MyComponents/SecondClass';
import Navbar from './MyComponents/Navbar';
import Notice from './MyComponents/Notice';
import Boards from './MyComponents/Boards';
import WhyUs from './MyComponents/WhyUs';
import Contact from './MyComponents/Contact';
import Mapcon from './MyComponents/Mapcon';
import Preloader from './MyComponents/Preloader'
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
const App = () =>{

  const [data, setData] = useState([])

  useEffect(()=>{
          axios.get('http://localhost:5000/api/notice_images')
              .then(res => {
                  
                  setData(res.data.data)
              })
              .catch(err =>{
                  console.log(err)
              })
  },[])
  const noticePaths = data.map((item) => item.notice.replace(/\\/g, '/'));
  const slides = [
    { url: noticeImage },
    ...noticePaths.map((path) => ({ url: `http://localhost:5000/${path}` })),
  ];
  console.log(slides);
  const cardspic = [
    { url: noticeImage, title: 'notice'},
    { url: noticeImage1, title: 'notice'},
    { url: noticeImage2, title: 'notice'},   
];
const notice ={
  position: 'relative',
  // top: '30px', 
  height: '60vh',
 
  width: '100%',
  borderRadius: '8px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)',
  backgroundColor: '#B9B6A2', 
   backgroundImage: `url(${noticeImage2})`
}
useEffect(()=>{
  AOS.init({duration:2000});
},[]);

const whyus ={
  position: 'relative',
  margin: '30px auto 0px',
  height: '100%',
  width: '100%',
  backgroundColor: '#FFFF99',
}
const contact ={
  position: 'relative',
  margin: '30px auto 0px',
  height: '100%',
  width: '100%',
  backgroundColor: '#FFFF99',
}
const mapcon = {
  position: 'absolute',
 
  height: '30vh',
  width: '100%',
}

  return (
    <>
    <Preloader/>
<div className='App'>  
    <div className="header"> 
      <Header/>
      <Navbar/>
    </div>
    <div className="notice"  >
    <div  style={notice}>
    <Notice slides={slides}/>
    </div>
    </div>
     <div className="WhyUs" style={whyus} >
      <WhyUs />
   </div> 
    <div className="Class" data-aos='fade-up' >
      <Class cardspic = {cardspic}/>
   </div>
    <div className="SecondClass" data-aos='fade-up' >
      <SecondClass cardspic = {cardspic}/>
   </div>
    <div className="Boards" data-aos='fade-up' >
      <Boards cardspic = {cardspic}/>
   </div>
   <div className="contact" style={contact}>
    <Contact/>
   </div>
 <div className='mapcon'>
   <Mapcon style={mapcon} />
   </div>
    <div className="footer">
    <Footer/>
   </div>
   </div>
   </>
  )
}

export default App;