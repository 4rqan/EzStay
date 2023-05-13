import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { generateImagePath } from "../../utils/utils";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOut } from "@fortawesome/free-solid-svg-icons";
import "../../css/admin-layout.css";

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const { getDpAndFullName } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`row ${isCollapsed ? "collapsed" : ""}`}>
      <div className="col-md-2 sidenav">
        <div className="row justify-content-center">
          <img
            src={generateImagePath(getDpAndFullName()?.dpPath)}
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            alt="Profile Image"
          />
          <p
            className="text-center text-capitalize"
            style={{
              marginTop: "20px",
              color: "white",
              fontWeight: 500,
            }}
          >
            {getDpAndFullName()?.fullname}
          </p>
        </div>
        <ul className="sidenav-list">
          <li className="sidenav-item active">
            <Link className="nav-link" to="/admin/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="sidenav-item">
            <Link className="nav-link" to="/admin/users">
              Users
            </Link>
          </li>
          <li className="sidenav-item">
            <Link className="nav-link" to="/admin/profile">
              Profile
            </Link>
          </li>
          <li className="sidenav-item">
            <Link className="nav-link" onClick={logout}>
              Logout <FontAwesomeIcon icon={faSignOut} />
            </Link>
          </li>
        </ul>
        <div className="toggle-sidebar" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className="col-md-10 main-content">{children}</div>
    </div>
  );
  // return (
  //   <>
  //     <header className="">
  //       <nav className="navbar navbar-expand-lg">
  //         <div className="container">
  //           <Link className="navbar-brand" to={"/"}>
  //             <h2>
  //               Ez <em>Stay</em>
  //             </h2>
  //           </Link>
  //           <button
  //             className="navbar-toggler"
  //             type="button"
  //             data-toggle="collapse"
  //             data-target="#navbarResponsive"
  //             aria-controls="navbarResponsive"
  //             aria-expanded="false"
  //             aria-label="Toggle navigation"
  //           >
  //             <span className="navbar-toggler-icon"></span>
  //           </button>
  //           <div className="collapse navbar-collapse" id="navbarResponsive">
  //             <ul className="navbar-nav ml-auto">
  //               <li className="nav-item active">
  //                 <Link className="nav-link" to="/">
  //                   Home
  //                   <span className="sr-only">(current)</span>
  //                 </Link>
  //               </li>

  //               <>
  //                 <li className="nav-item">
  //                   <Link className="nav-link" to="/profile">
  //                     Profile
  //                   </Link>
  //                 </li>
  //               </>

  //               <li className="nav-item">
  //                 <Link className="nav-link" to="/admin/users">
  //                   Users
  //                 </Link>
  //               </li>

  //               <li className="nav-item">
  //                 <Link className="nav-link" onClick={logout}>
  //                   Logout
  //                 </Link>
  //               </li>
  //             </ul>
  //           </div>
  //         </div>
  //       </nav>
  //     </header>

  //     {children}

  //     <footer>
  //       <div className="container">
  //         <div className="row">
  //           <div className="col-md-12">
  //             <div className="inner-content">
  //               <p>Copyright &copy; {new Date().getFullYear()} Ez Stay</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </footer>
  //   </>
  // );
};

export default AdminLayout;
