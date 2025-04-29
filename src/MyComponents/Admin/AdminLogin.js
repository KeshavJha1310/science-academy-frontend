import axios from 'axios';
import React, { useState } from 'react';
import '../Admin/AdminLogin.css';
import Preloader from '../Preloader';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(adminId, adminPassword);

    try {
      const response = await axios.post('https://science-academy-server.vercel.app/admin/adminLogins', {
        AdminId: adminId,
        AdminPassword: adminPassword,
      });

      const { message, token } = response.data;
      console.log(message, token);
      setErrorMessage('');

      if (message === 'Success') {
        setIsError(false);
        localStorage.setItem('token', token);
        showNotification('Login Successful', 'You have successfully logged in');
        navigate('/Admin/AdminPanel');
      } else if (message === 'InvalidAdminId') {
        setIsError(true);
        setErrorMessage('Invalid Admin ID');
        showNotification('Login Failed', 'Invalid Admin ID');
      } else if (message === 'InvalidAdminPassword') {
        setIsError(true);
        setErrorMessage('Invalid Admin Password');
        showNotification('Login Failed', 'Invalid Admin Password');
      } else {
        setIsError(true);
        setErrorMessage('Login failed. Please try again.');
        showNotification('Login Failed', 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
      setErrorMessage('Server Error. Try again later.');
      showNotification('Error', 'Server is not responding');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showNotification = (title, message) => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, { body: message });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(title, { body: message });
          }
        });
      }
    }
  };

  return (
    <>
      <Preloader />
      <div className="containerfoot">
        <div className="login-container">
          <div className="back" onClick={() => navigate('/')}>
            <i className="fa-solid fa-arrow-left-long"></i>
          </div>
          <h5 className="title2">Welcome Back</h5>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group floating-label">
              <input
                type="text"
                className="form-control"
                placeholder="Admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
              />
            </div>
            <div className="form-group floating-label">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Admin Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <div className="icon" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash" />
                ) : (
                  <i className="fa-solid fa-eye" />
                )}
              </div>
            </div>

            {errorMessage && (
              <p style={{ color: isError ? 'red' : 'green', marginTop: '10px' }}>
                {errorMessage}
              </p>
            )}

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
