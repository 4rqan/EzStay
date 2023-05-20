import { useState } from "react";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { InputBase, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const PrivateLayout = ({ children }) => {
  const [showNavBar, setShowNavBar] = useState(false);

  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const { logout, isAdmin, isInRole, getDpAndFullName } = useAuth();

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
                <li className="nav-item">
                  <div className="search-field mt-2">
                    <InputBase
                      placeholder="Search..."
                      inputProps={{ "aria-label": "search" }}
                      sx={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "4px",
                        paddingLeft: "8px",
                        color: "#000000",
                      }}
                      value={searchText}
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key == "Enter")
                          navigate("/search?searchText=" + searchText);
                      }}
                    />
                    <IconButton
                      onClick={() => {
                        navigate("/search?searchText=" + searchText);
                      }}
                      type="submit"
                      aria-label="search"
                      sx={{
                        backgroundColor: "#FFFFFF",
                        color: "#000000",
                        height: "25px",
                        width: "25px",
                        margin: "-32px",
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </div>
                </li>

                {/* End of search field */}
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
                        Landlord Bookings
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

                <NavDropdown
                  title={getDpAndFullName()?.fullname}
                  menuVariant="dark"
                >
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
                <p>
                  Copyright &copy; {new Date().getFullYear()}
                  Ez Stay
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default PrivateLayout;
