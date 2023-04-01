import { Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const PrivateLayout = ({ children }) => {
  const { logout, isAdmin, isInRole } = useAuth();
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
                <li className="nav-item">
                  <Link className="nav-link" to="/mybookings">
                    My Bookings
                  </Link>
                </li>
                {isAdmin() && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/users">
                        Admin Panel
                      </Link>
                    </li>
                  </>
                )}
                {isInRole("Landlord") && (
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
                        Landlord
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/landlord/addListings">
                          Add Listings
                        </Dropdown.Item>
                        <Dropdown.Item to="/landlord/rentalListings" as={Link}>
                          Rental Listings
                        </Dropdown.Item>
                        <Dropdown.Item to="/landlord/bookings" as={Link}>
                          Lanlord Bookings
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
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
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {children}

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

export default PrivateLayout;
