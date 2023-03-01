import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PrivateLayout from "../Layout/PrivateLayout";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated()) return <Navigate to="/login" />;
  else return <PrivateLayout>{children}</PrivateLayout>;
};

export default PrivateRoute;
