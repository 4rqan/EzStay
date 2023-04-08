import { Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const PrivateLayout = ({ children }) => {
  const { logout, isAdmin, isInRole } = useAuth();
  return (
    <>
      <header className="">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <NavLink className="navbar-brand" to={"/"}>
              <h2>
                Ez <em>Stay</em>
              </h2>
            </NavLink>
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
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/allproperties"
                  >
                    Properties
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/mybookings"
                    activeClassName="active"
                  >
                    My Bookings
                  </NavLink>
                </li>
                {isAdmin() && (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/admin/users"
                        activeClassName="active"
                      >
                        Admin Panel
                      </NavLink>
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
                    <Dropdown.Item as={Link} to="/changepassword">
                      Change Password
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
