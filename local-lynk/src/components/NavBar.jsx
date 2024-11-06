import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar className="navbar">
      <Nav>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
        <Nav.Link as={Link} to="/feed">Feed</Nav.Link>
        <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
