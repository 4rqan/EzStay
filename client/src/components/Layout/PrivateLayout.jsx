import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const PrivateLayout = ({ children }) => {
  const { logout, isAdmin } = useAuth();
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

                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                </>
                {isAdmin() && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/users">
                        Admin Panel
                      </Link>
                    </li>
                  </>
                )}

                <li className="nav-item">
                  <Link className="nav-link" to="/landlord/addListings">
                    Add Listings
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/landlord/rentalListings">
                    Rental Listings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={logout}>
                    Logout
                  </Link>
                </li>
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
