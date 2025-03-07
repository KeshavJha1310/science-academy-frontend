import React , { useState } from 'react';
import '../studentloginbutton.css';
function StudentLoginButton() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="login-container">
      <h5 className='title'>Class Login</h5>
      <form className="login-form">
        <div className="form-group floating-label">
          <input type="text" className="form-control" id="username" placeholder="CLass ID" />
          {/* <label htmlFor="username">Username</label> */}
        </div>
        <div className="form-group floating-label">
          <input type={showPassword ? 'text' : 'password'} className="form-control" id="password" placeholder="Class Password "/> 

          <div className="icon">
        <i  className="fa-solid fa-eye" onClick={togglePasswordVisibility}  />
      
        </div>
     
        
       
       
          {/* <label htmlFor="password">Password</label> */}
        </div>
      
        <button type="submit" className="btn btn-primary">Login</button> 
         <p className="notice">Class login for those who have already enrolled in this class.</p>
      </form>
    
    </div>
  );
}

export default StudentLoginButton;


