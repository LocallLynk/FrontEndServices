import '../css/home.css';
import { useAuth0 } from '@auth0/auth0-react';

const HomePage = () => {
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div id="homepage" className="homepage-container">
      {/* Left Side (Logo) */}
      <div className="logo-container">
        <img
          src="/imgs/LocalLynk with name.png"
          alt="LocalLynk Logo"
          className="logo-img"
        />
      </div>

      {/* Right Side (Text Content) */}
      <div className="content-container">
        <div className="text-content">
          <h1>What&apos;s Local?</h1>
          <p>Find out today.</p>

          {/* Auth0 Login Button */}
          {!isAuthenticated ? (
            <div className="auth-btn-container">
              <button onClick={() => loginWithRedirect()} className="auth-btn">
                Log In / Sign Up
              </button>
            </div>
          ) : (
            <p>Hello, {user.name}</p> // Display user's name when authenticated
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
