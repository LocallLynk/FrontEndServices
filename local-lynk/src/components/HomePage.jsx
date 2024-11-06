import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
    <>
      <div>
        <img
          className="logo-img"
          src="/imgs/LocalLynk with name.png"
          alt="Logo for LocalLynk"
        />
      </div>
      <div className="homepage">
        <h1>LocalLynk</h1>
        <h2>Ready to get started?</h2>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <br />
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
        </div>
        <div>
        <footer className="footer">
          <p>2024 LocalLynk</p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
