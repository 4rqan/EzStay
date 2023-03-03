import { Route, Routes } from "react-router-dom";
import UserListPage from "../pages/Admin/UserListPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import SignupPage from "../pages/SignupPage";
import AdminRoute from "./Routes/AdminRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path={""}
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path={"/login"}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path={"/signup"}
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path={"/profile"}
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        {/* Admin Routes Start */}
        <Route
          path={"/admin/users"}
          element={
            <AdminRoute>
              <UserListPage />
            </AdminRoute>
          }
        />
        {/* Admin Routes End */}
      </Routes>
    </>
  );
};

export default AppRouter;
