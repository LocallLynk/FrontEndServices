import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'

const HomePage = () => {
  const navigate = useNavigate();
  
   const handleLogin = () => {
    navigate('/login');
  };

   const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className='homepage'>
      <h1>LocalLynk</h1>
      <h2>Community builds community</h2>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <button className="register-button" onClick={handleRegister}>
        Register
      </button>
      <footer className="footer">© 2024 LocalLynk</footer>
    </div>
  );
};

export default HomePage;
