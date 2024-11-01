import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar>
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
