import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

function NavigationBar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Navbar className="navbar">
      <Nav>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        {/* Conditionally render login/register or logout links */}
        {!isAuthenticated ? (
          <>
            <Nav.Link as={Link} to="/login" onClick={() => loginWithRedirect()}>Login</Nav.Link>
            <Nav.Link as={Link} to="/register" onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Register</Nav.Link>
          </>
        ) : (
          <Nav.Link as={Link} to="/" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Nav.Link>
        )}
        <Nav.Link as={Link} to="/feed">Feed</Nav.Link>
        <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
