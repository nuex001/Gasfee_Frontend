import React, { useContext } from "react";
import { Route, Navigate, useNavigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  return !localStorage.token ? <Navigate to="/signin" /> : <Outlet />;
};

export default PrivateRoutes;