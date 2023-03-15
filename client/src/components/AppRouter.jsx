import { Route, Routes } from "react-router-dom";
import UserDetailsPage from "../pages/Admin/UserDetailsPage";
import UserListPage from "../pages/Admin/UserListPage";
import HomePage from "../pages/HomePage";
import AddListingsPage from "../pages/Landlord/AddListingsPage";
import RentalListingsPage from "../pages/Landlord/RentalListingsPage";
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
        <Route
          path={"/admin/userdetails/:id"}
          element={
            <AdminRoute>
              <UserDetailsPage />
            </AdminRoute>
          }
        />
        {/* Admin Routes End */}

        {/*Landlord Routes Starts  */}
        <Route
          path={"/landlord/addlistings"}
          element={
            <PrivateRoute>
              <AddListingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/landlord/rentalListings"}
          element={
            <PrivateRoute>
              <RentalListingsPage />
            </PrivateRoute>
          }
        />

        {/* Lanlord Routes Ends */}
      </Routes>
    </>
  );
};

export default AppRouter;
