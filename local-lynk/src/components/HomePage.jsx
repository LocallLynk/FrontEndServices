const HomePage = () => {
  const handleLogin = () => {
    console.log("Login button clicked");
  };

  const handleRegister = () => {
    console.log("Register button clicked");
  };

  return (
    <div>
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
