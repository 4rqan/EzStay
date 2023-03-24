import React from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PrivateLayout from "../Layout/PrivateLayout";

const PrivateRoute = ({ children, landLordRoute }) => {
  const location = useLocation();
  console.log(landLordRoute);
  const { isAuthenticated, isInRole } = useAuth();
  if (!isAuthenticated() || (landLordRoute && !isInRole("Landlord")))
    return <Navigate to={"/login?returnUrl=" + location.pathname} />;
  else return <PrivateLayout>{children}</PrivateLayout>;
};

export default PrivateRoute;
