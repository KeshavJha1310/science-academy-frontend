import React, { useEffect } from 'react';
import './Preloader.css';
import {preLoaderAnim} from './animation';
const Preloader = () => { 
  
  useEffect(()=>{
    preLoaderAnim()
    },[]);
  return (
 <>
    <div className='preloader'>
        <div className='texts-container'>
        <span>Educator-</span>
        <span>Apprentice-</span>
        <span>Enthusiast....</span>
        </div>
    </div>
    </>
  )
}

export default Preloader
