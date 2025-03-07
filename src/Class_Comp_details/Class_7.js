import React from 'react';
import Navbar2 from './Navbar2';
import Class_t7 from '../Class_tables/Class_t7';
import Class_T7 from '../Class_Timings/Class_T7';
import StudentLoginButton from './StudentLoginButton';
import Contact from '../MyComponents/Contact';
import '../App2.css';
import Preloader from '../MyComponents/Preloader'

const Class_7 = () => {
  const contact ={
    position: 'relative',
    margin: '30px auto 0px',
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFF99',
  }
  return (
    <> 
     <Preloader/>
      <div className='App2'>  
      <div className="header">
      <Navbar2 />
     </div>
      
          <StudentLoginButton />
   
        <div className='tablecon '>
        <h3>Fees Payment Structure</h3>
        <Class_t7/>
        </div>
         <div className='tablecon '>
        <h3>Timings</h3>
        <Class_T7/>
        </div>
        <div className="contact" style={contact}>
    <Contact/>
   </div>
      </div>
    </>
  );
}

export default Class_7;

