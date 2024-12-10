import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import FeedPage from "./components/Pages/Feed";
import UsersProfile from "./components/Pages/UserProfile";
import PrivateRoute from "./components/auth0/PrivateRoute";
import NavbarComponent from "./components/Features/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import RegisterPage from "./components/Pages/RegisterPage";
import PostPage from "./components/Pages/LinkedPostPage";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {/* Render NavbarComponent only for authenticated users */}
      {isAuthenticated && <NavbarComponent />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/user/:id" element={<UsersProfile />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
