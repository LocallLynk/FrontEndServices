import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import FeedPage from "./components/Pages/Feed";
import UsersProfile from "./components/Pages/UserProfile";
//import AuthorizedUser from "./components/Pages/AuthorizedUserProfile";
import PrivateRoute from "./components/auth0/PrivateRoute";
import NavbarComponent from "./components/Features/NavBar";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {/* Render NavbarComponent only for authenticated users */}
      {isAuthenticated && <NavbarComponent />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/user/:userId" element={<UsersProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
