import AuthButton from "../auth0/AuthButton";
import "../css/home.css";
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  const { isAuthenticated, isLoading } = useAuth0();

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

          {!isAuthenticated ? (
            <div className="auth-btn-container">
              <AuthButton className="auth-btn" /> {/* Login Button */}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
