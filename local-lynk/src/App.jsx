import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import NavigationBar from "./components/Features/NavBar";
import LoginPage from "./components/Pages/Extras/Login"
import RegisterPage from "./components/Pages/Extras/Register";
import FeedPage from "./components/Pages/Feed";
import Callback from "./auth0/Callback";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import UsersProfile from "./components/Pages/UserProfile";
import AuthorizedUser from "./components/Pages/AuthorizedUserProfile";


function App() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    navigate("/"); // Redirect to home after logout
  };

  return (
    <div>
      {/* <NavigationBar isAuthenticated={isAuthenticated} loginWithRedirect={loginWithRedirect} handleLogout={handleLogout} /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/user/:userId" element={<UsersProfile />} />
        {//<Route path="/profile" element={<AuthorizedUser />} /> this goes to the user's profile page, just testing it out with some things
}
      </Routes>
    </div>
  );
}

export default App;