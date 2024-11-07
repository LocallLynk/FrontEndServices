import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/home.css';

const HomePage = () => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
      <div className='main-content'>
        <div>
      <img
        className="logo-img"
        src="/imgs/LocalLynk with name.png"
        alt="Logo for LocalLynk" />
    </div>
    <div className="homepage">
        <h1>LocalLynk</h1>
        <br></br>
        <h2>Ready to get started?</h2>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <br />
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
      </div>
      {/* <div className='footer'>
      <footer>2024 Local Lynk</footer>
      </div> */}
      </div>
  );
};

export default HomePage;
