import axios from 'axios';
import React, { useState } from 'react';
import '../Admin/AdminLogin.css'
import Preloader from '../Preloader'
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate()
  const [AdminId, setAdminId] = useState('');
  const [AdminPassword, setAdminPassword] = useState('');

//  const [loggedIn, setLoggedIn] = useState(false);
//   const handleClick = () => {
//     console.log(AdminId, AdminPassword);
//     axios.post('https://science-academy-server.vercel.app/api/adminLogin', {
//         AdminId: AdminId,
//         AdminPassword: AdminPassword
//     })
//     .then((res) => {
//         console.log(res.data);
//         if (res.data) {
//             // Login successful, navigate to AdminPanel
//             navigate('/AdminPanel');
//         } else {
//             // Login failed, handle error or display appropriate message
//             console.log('Login failed');
//         }
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }

const handleSubmit  = (e) => {
  e.preventDefault(); // Prevent the default form submission
  console.log(AdminId, AdminPassword);
  axios
    .post('https://science-academy-server.vercel.app/admin/adminLogins', {
      AdminId : AdminId,
      AdminPassword : AdminPassword ,
    })
    .then((res) => {
      console.log(res.data);
      const { message } = res.data;
      let token = res.data.token
      console.log(message);
      console.log(token);
      if (message === 'Success') {
        localStorage.setItem('token',token)
        navigate('https://scienceacademys.com/Admin/AdminPanel');
        showNotification('Login Successful', 'You have successfully logged in');
      } else if(message === 'InvalidAdminId' ) {

        showNotification('Login UnSuccessful', 'Invalid Admin ID');
      }else if( message === 'InvalidAdminPassword') {
        showNotification('Login UnSuccessful', 'Invalid Admin Password');
      }
      // else if(message === 'InvalidCredentials'){
      //   showNotification('Login UnSuccessful', 'Invalid Credentails');
      // }
    
    })
    .catch((err) => {
      console.log(err);
    });
};

const showNotification = (title, message) => {
  if ('Notification' in window) {
    // Check if the browser supports notifications
    if (Notification.permission === 'granted') {
      // If permission is granted, show the notification
      new Notification(title, { body: message });
    } else if (Notification.permission !== 'denied') {
      // Request permission from the user
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, { body: message });
        }
      });
    }
  }
};

const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};
return (
  <>
  <Preloader/>
    <div className="containerfoot">
  <div className="login-container">
    {/* <h5 className='title'>Admin Login</h5> */}
   <div className='back' onClick={()=>{navigate('/')}}><i class="fa-solid fa-arrow-left-long"></i></div> <h5 className='title2'>Welcome Back</h5>
    <form className="login-form"  onSubmit={handleSubmit}>
      <div className="form-group floating-label">
        <input type="text" className="form-control" id="AdminId" placeholder="Admin ID" value={AdminId}
              onChange={(e) => setAdminId(e.target.value)} />
        {/* <label htmlFor="username">Username</label> */}
      </div>
      <div className="form-group floating-label">
        <input type={showPassword ? 'text' : 'password'} className="form-control" id="AdminPassword" placeholder="Admin Password "   value={AdminPassword}
              onChange={(e) => setAdminPassword(e.target.value)} /> 
      </div>
        <div className="icon" onClick={togglePasswordVisibility}>
        {showPassword ? (
          <i className="fa-solid fa-eye-slash" /> 
        ) : (
          <i className="fa-solid fa-eye" /> 
        )}
      </div>
    
      <button href='/Admin/AdminPanel'  type="submit" className="btn btn-primary">Login</button> 
 
    </form>
    {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' , width:'100%' }}>
      <button  onClick={()=>{navigate('/')}} style={{backgroundColor:'transparent'}} className="btn">Back</button> 
   </div> */}
  </div>
  </div>
  </>
);
};

export default AdminLogin;
