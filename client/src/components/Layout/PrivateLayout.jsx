import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../../contexts/AuthContext";

const PrivateLayout = ({ children }) => {
  const { logout } = useAuth();
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            EzStay
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to="/" as={Link}>
              Home
            </Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Divider />
              <NavDropdown.Item to="/profile" as={Link}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      {children}
    </>
  );
};

export default PrivateLayout;
