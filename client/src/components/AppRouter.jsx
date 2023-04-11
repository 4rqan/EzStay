import { Route, Routes } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import UserDetailsPage from "../pages/Admin/UserDetailsPage";
import UserListPage from "../pages/Admin/UserListPage";
import AllPropertiesPage from "../pages/AllPropertiesPage";
import BookPropertyPage from "../pages/BookPropertyPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import ContactPage from "../pages/ContactPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import HomePage from "../pages/HomePage";
import AddListingsPage from "../pages/Landlord/AddListingsPage";
import BookingDetailsPage from "../pages/Landlord/BookingDetailsPage";
import LandlordBookingsPage from "../pages/Landlord/LandlordBookingsPage";
import RentalDetailsPage from "../pages/Landlord/RentalDetailsPage";
import RentalListingsPage from "../pages/Landlord/RentalListingsPage";
import LoginPage from "../pages/LoginPage";
import MyBookingDetailsPage from "../pages/MyBookingDetailsPage";
import MyBookingsPage from "../pages/MyBookingsPage";
import ProfilePage from "../pages/ProfilePage";
import PropertyDetailsPage from "../pages/PropertyDetailsPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import SignupPage from "../pages/SignupPage";
import AdminRoute from "./Routes/AdminRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import DashboardPage from "../pages/Admin/DashboardPage";

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
          path={"/contact"}
          element={
            <PublicRoute>
              <ContactPage />
            </PublicRoute>
          }
        />
        <Route
          path={"/about"}
          element={
            <PublicRoute>
              <AboutPage />
            </PublicRoute>
          }
        />
        <Route
          path={"/propertydetails/:id"}
          element={
            <PublicRoute>
              <PropertyDetailsPage />
            </PublicRoute>
          }
        />
        <Route
          path={"/allproperties/"}
          element={
            <PublicRoute>
              <AllPropertiesPage />
            </PublicRoute>
          }
        />

        <Route
          path={"/bookproperty/:id"}
          element={
            <PrivateRoute>
              <BookPropertyPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/mybookings"}
          element={
            <PrivateRoute>
              <MyBookingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/booking/:id"}
          element={
            <PrivateRoute>
              <MyBookingDetailsPage />
            </PrivateRoute>
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
        <Route
          path={"/changepassword"}
          element={
            <PrivateRoute>
              <ChangePasswordPage />
            </PrivateRoute>
          }
        />

        <Route
          path={"/forgotpassword"}
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />

        <Route
          path={"/resetpassword"}
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
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
        <Route
          path={"/admin/dashboard"}
          element={
            <AdminRoute>
              <DashboardPage />
            </AdminRoute>
          }
        />
        {/* Admin Routes End */}

        {/*Landlord Routes Starts  */}
        <Route
          path={"/landlord/addlistings"}
          element={
            <PrivateRoute landLordRoute>
              <AddListingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/landlord/rentalListings"}
          element={
            <PrivateRoute landLordRoute>
              <RentalListingsPage />
            </PrivateRoute>
          }
        />

        <Route
          path={"/landlord/rentalListings/:id"}
          element={
            <PrivateRoute landLordRoute>
              <RentalDetailsPage />
            </PrivateRoute>
          }
        />

        <Route
          path={"/landlord/bookings"}
          element={
            <PrivateRoute landLordRoute>
              <LandlordBookingsPage />
            </PrivateRoute>
          }
        />

        <Route
          path={"landlord/booking/:id"}
          element={
            <PrivateRoute landLordRoute>
              <BookingDetailsPage />
            </PrivateRoute>
          }
        />
        {/* Lanlord Routes Ends */}
      </Routes>
    </>
  );
};

export default AppRouter;
