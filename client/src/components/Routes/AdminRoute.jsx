import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AdminLayout from "../Layout/AdminLayout";

const AdminRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  if (!isAdmin()) return <Navigate to="/login" />;
  else return <AdminLayout>{children}</AdminLayout>;
};

export default AdminRoute;
