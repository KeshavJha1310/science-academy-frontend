import React from 'react';
import Navbar2 from './Navbar2';
import Class_t2 from '../Class_tables/Class_t2';
import Class_T2 from '../Class_Timings/Class_T2';
import StudentLoginButton from './StudentLoginButton';
import Contact from '../MyComponents/Contact';
import Preloader from '../MyComponents/Preloader'
import '../App2.css';

const Class_2 = () => {
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
   
        {/* <div className='tablecon '>
        <h3>Fees Payment Structure</h3>
        <Class_t2/>
        </div> */}
        <div className='tablecon '>
        <h3>Timings</h3>
        <Class_T2/>
        </div>
        <div className="contact" style={contact}>
    <Contact/>
   </div>
      </div>
    </>
  );
}

export default Class_2;

