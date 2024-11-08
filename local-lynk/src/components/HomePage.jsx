import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import './css/home.css';

const HomePage = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleLogin = () => {
    console.log("Login button clicked");
    loginWithRedirect();
  };

  const handleRegister = () => {
    console.log("Register button clicked");
    loginWithRedirect({ screen_hint: 'signup' }); // Redirect to registration screen
  };

  const handleLogout = () => {
    console.log("Logout button clicked");
    logout({ returnTo: window.location.origin }); // Log the user out
  };

  return (
    <>
      {/* React Bootstrap Navbar */}
      <Navbar expand="lg" fixed="top" className="navbar-custom">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/imgs/LocalLynk with name.png"
              alt="Logo for LocalLynk"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            LocalLynk
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Show Login/Register if not authenticated */}
              {!isAuthenticated ? (
                <>
                  <Nav.Link onClick={handleLogin}>Login</Nav.Link>
                  <Nav.Link onClick={handleRegister}>Register</Nav.Link>
                </>
              ) : (
                // Show Logout button if authenticated
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <div className='main-content'>
        <div>
          <img
            className="logo-img"
            src="/imgs/LocalLynk with name.png"
            alt="Logo for LocalLynk"
          />
        </div>
        <div className="homepage">
          <h1>Welcome to LocalLynk!</h1>
          <br />
          <p>
            LocalLynk is a project created by four Coding Temple alumni for their
            final project. Designed with the purpose to connect others with
            contractors in their area, we understand community is the forefront to
            the building blocks of the world.
          </p>

          {/* Show Login/Register buttons if not authenticated */}
          {!isAuthenticated ? (
            <>
              <Button variant="outline-primary" className="login-button" onClick={handleLogin}>
                Login
              </Button>
              <br />
              <Button variant="outline-secondary" className="register-button" onClick={handleRegister}>
                Register
              </Button>
            </>
          ) : (
            // Show user name and logout button if authenticated
            <div>
              {user && <p>Welcome back, {user.name}!</p>}
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
