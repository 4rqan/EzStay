import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import "../../vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/css/fontawesome.css";
import "../../assets/css/templatemo-sixteen.css";
import "../../assets/css/owl.css";
import PrivateLayout from "./PrivateLayout";
import { useState } from "react";

const PublicLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [showNavBar, setShowNavBar] = useState(false);

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
