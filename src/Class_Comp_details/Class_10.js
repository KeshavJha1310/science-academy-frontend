import React from 'react';
import Navbar2 from './Navbar2';
import Class_t10 from '../Class_tables/Class_t10';
import Class_T10 from '../Class_Timings/Class_T10';
import StudentLoginButton from './StudentLoginButton';
import Contact from '../MyComponents/Contact';
import '../App2.css';
import Preloader from '../MyComponents/Preloader'

const Class_10 = () => {
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
        <Class_t10/>
        </div>
        <div className='tablecon '>
        <h3>Timings</h3>
        <Class_T10/>
        </div>
        <div className="contact" style={contact}>
    <Contact/>
   </div>
      </div>
    </>
  );
}

export default Class_10;

