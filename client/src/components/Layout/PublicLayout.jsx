import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../../contexts/AuthContext";

import "../../vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/css/fontawesome.css";
import "../../assets/css/templatemo-sixteen.css";
import "../../assets/css/owl.css";
import { Dropdown } from "react-bootstrap";

const PublicLayout = ({ children }) => {
  const { logout, isAuthenticated } = useAuth();
  return (
    <>
      <header className="">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>
              <h2>
                Ez <em>Stay</em>
              </h2>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                {isAuthenticated() ? (
                  <>
                    <Dropdown>
                      <Dropdown.Toggle
                        className="nav-link"
                        id="dropdown-basic"
                        style={{
                          color: "white",
                          background: "transparent",
                          border: "transparent",
                        }}
                      >
                        Account
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/profile">
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">
                        Signup
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <Container className="mt-3">{children}</Container>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="inner-content">
                <p>Copyright &copy; {new Date().getFullYear()} Ez Stay</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default PublicLayout;
