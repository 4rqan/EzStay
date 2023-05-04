import { Dropdown, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateLayout = ({ children }) => {
  const [showNavBar, setShowNavBar] = useState(false);

  const { logout, isAdmin, isInRole, getUsername } = useAuth();

  const hideNavBar = () => {
    setShowNavBar(false);
  };
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
              onClick={() => {
                setShowNavBar(!showNavBar);
              }}
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={!showNavBar ? "collapse navbar-collapse" : ""}
              id="navbarResponsive"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" onClick={hideNavBar}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    onClick={hideNavBar}
                    className="nav-link"
                    activeClassName="active"
                    to="/allproperties"
                  >
                    Properties
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavDropdown title="My Bookings" menuVariant="dark">
                    <NavDropdown.Item
                      as={Link}
                      to="/mybookings"
                      onClick={hideNavBar}
                    >
                      Property Bookings
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/myservicebookings"
                      onClick={hideNavBar}
                    >
                      Service Bookings
                    </NavDropdown.Item>
                  </NavDropdown>
                </li>
                {isAdmin() && (
                  <>
                    <li className="nav-item">
                      <NavLink
                        onClick={hideNavBar}
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
                    <NavDropdown title="Landlord" menuVariant="dark">
                      <NavDropdown.Item
                        onClick={hideNavBar}
                        as={Link}
                        to="/landlord/addListings"
                      >
                        Add Listings
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        to="/landlord/rentalListings"
                        as={Link}
                        onClick={hideNavBar}
                      >
                        Rental Listings
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={hideNavBar}
                        to="/landlord/bookings"
                        as={Link}
                      >
                        Lanlord Bookings
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
                {isInRole("Worker") && (
                  <>
                    <NavDropdown title="Worker" menuVariant="dark">
                      <NavDropdown.Item
                        onClick={hideNavBar}
                        as={Link}
                        to="/worker/mybookings"
                      >
                        My Bookings
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}

                <NavDropdown title={getUsername()} menuVariant="dark">
                  <NavDropdown.Item
                    onClick={hideNavBar}
                    as={Link}
                    to="/profile"
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={hideNavBar}
                    as={Link}
                    to="/changepassword"
                  >
                    Change Password
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      hideNavBar();
                      logout();
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
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
