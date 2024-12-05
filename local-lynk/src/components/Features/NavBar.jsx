import { useAuth0 } from '@auth0/auth0-react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SearchBar } from './Search Bar Components/SearchBar';// Importing the SearchBar component
import { useState } from 'react';

const NavbarComponent = () => {
  const { isAuthenticated, logout, user } = useAuth0(); // Added `user` to access user details
  const [searchResults, setSearchResults] = useState([]); // State for search results

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Local Lynk</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/feed">Community Posts</Nav.Link>
                <Nav.Link as={Link} to={`/myprofile`}>My Profile</Nav.Link>
                <Nav.Link onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Nav.Link>
              </>
            )}
          </Nav>
          {isAuthenticated && (
            <div className="d-flex ms-auto">
              {/* SearchBar component */}
              <SearchBar setResults={setSearchResults} />
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

