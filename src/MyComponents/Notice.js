import React from 'react';
import noticeImage2 from '../images/5bcd6fef-0d62-434a-af23-d331077c2616.jpg';
// import axios from 'axios';
// import '../MyComponents/notice.css';
import { useState ,useRef, useEffect } from 'react';
//import Carousel from 'react-bootstrap/Carousel';

const Notice = ({slides}) => {

    // const [data, setData] = useState([])
    // useEffect(()=>{
    //     axios.get('http://localhost:5000/api/notice_images')
    //         .then(res => {
    //             console.log(res.data)
    //             setData(res.data.data)
    //         })
    //         .catch(err =>{
    //             console.log(err)
    //         })
    // },[])
    console.log("slides :- ",slides)

   const[currentIndex, setCurrentIndex] = useState(0);
   const sliderstyle ={
    position:"relative",
    height:"100%",
    backgroundImage: `url(${noticeImage2})`
   };
    const slidestyles = {
        border: "2px solid black",
        position:"absolute",
        height:"100%",
        width:"100%",
        borderRadius: "10px",
        backgroundSize: 'contain', // New property
        backgroundPosition: "center",
        backgroundRepeat: 'no-repeat',
       backgroundImage: `url(${slides[currentIndex].url})`

    };

        const leftArrowStyles = {
            position: 'absolute',
            top:'50%',
            transform:'translate(0,-50%)',
            left:'32px',
            fontSize:'75px',
            color:'#f0f0f0',
            zIndex: 1,
            cursor:'pointer',
        };
        const rigthArrowStyles = {
            position: 'absolute',
            top:'50%',
            transform:'translate(0,-50%)',
            right:'32px',
            fontSize:'75px',
            color:'#f0f0f0',
            zIndex: 1,
            cursor:'pointer',
        };
   const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length -1: currentIndex -1;
    setCurrentIndex(newIndex);
   };
   const goToNext = () => {
const islastSlide = currentIndex === slides.length -1
const newIndex = islastSlide? 0 : currentIndex + 1;
setCurrentIndex(newIndex);

   };
//    const dotsconstainerStyles ={
//     position: 'absolute',
//     bottom: '0px',
//     display:'flex',
//     justifyContent:'center',
//    alignItems:'center'
//    };

//    const dotStyle = {
//     margin:'0 3px',
//     cursor:'pointer',
//     fontSize:'20px',
//     display:'flex',
//     justifyContent:'center',
//     alignItems:'center'
//    };
  return (
    <>
    
    <div id='noticeborad' style={sliderstyle}>
  
    <div style={leftArrowStyles} onClick={goToPrevious}>&#60;</div>
    <div style={rigthArrowStyles} onClick={goToNext}>&#62;</div>
    <div style={slidestyles}>

    </div>
  
    </div>  

     </>
  )
}

export default Notice