import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand as={Link} to="/home">
        Home
      </Navbar.Brand>
      <br />
      <Navbar.Brand as={Link} to="/login">
        Login
      </Navbar.Brand>
      <br />
      <Navbar.Brand as={Link} to="/settings">
        Settings
      </Navbar.Brand>
      <br />
      <Navbar.Brand as={Link} to="/profile">
        Profile
      </Navbar.Brand>
      <br />
      <Navbar.Brand as={Link} to="/about-local-lynk">
        About
      </Navbar.Brand>
      <br />
    </Navbar>
  );
}

export default NavigationBar;
