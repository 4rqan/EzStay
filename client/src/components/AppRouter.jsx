import { Link, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import SignupPage from "../pages/SignupPage";

const AppRouter = () => {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path={""} element={<HomePage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/signup"} element={<SignupPage />} />
        <Route path={"/profile"} element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
