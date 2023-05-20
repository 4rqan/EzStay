import Container from "react-bootstrap/Container";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import "../../vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/css/fontawesome.css";
import "../../assets/css/templatemo-sixteen.css";
import "../../assets/css/owl.css";
import PrivateLayout from "./PrivateLayout";
import { useEffect, useState } from "react";
import { IconButton, InputBase } from "@mui/material";
import { getAllServices } from "../../services/worker.service";
import { Search as SearchIcon } from "@mui/icons-material";
import { NavDropdown } from "react-bootstrap";

const PublicLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [showNavBar, setShowNavBar] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllServices(setServices);
  }, []);

  const hideNavBar = () => {
    setShowNavBar(false);
  };

  if (isAuthenticated()) {
    return <PrivateLayout>{children}</PrivateLayout>;
  }

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
                  <NavLink
                    onClick={hideNavBar}
                    className="nav-link"
                    activeClassName="active"
                    to="/"
                  >
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
                {services.length > 0 && (
                  <li className="nav-item">
                    <NavDropdown title="Services" menuVariant="dark">
                      {services.map((item) => (
                        <NavDropdown.Item
                          key={item.service}
                          as={Link}
                          to={"/services/" + item.service}
                          onClick={hideNavBar}
                        >
                          {item.service}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  </li>
                )}
                <>
                  <li className="nav-item">
                    <NavLink
                      onClick={hideNavBar}
                      className="nav-link"
                      activeClassName="active"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      onClick={hideNavBar}
                      className="nav-link"
                      activeClassName="active"
                      to="/signup"
                    >
                      Signup
                    </NavLink>
                  </li>
                </>
                <li className="nav-item">
                  <NavLink
                    onClick={hideNavBar}
                    className="nav-link"
                    to="/about"
                    activeClassName="active"
                  >
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    onClick={hideNavBar}
                    className="nav-link"
                    to="/contact"
                    activeClassName="active"
                  >
                    Contact Us
                  </NavLink>
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
