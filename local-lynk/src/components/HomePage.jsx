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
    <h1 >Welcome to LocalLynk!</h1>
    <br></br>
      <p>
        LocalLynk is a project created by four Coding Temple alumni for their
        final project. Designed with the purpose to connect others with
        contractors in their area, we understand community is the forefront to
        the building blocks of the world.
      </p>
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
