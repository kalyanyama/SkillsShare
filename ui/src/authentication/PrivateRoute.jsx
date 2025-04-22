import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGlobalAccess } from "./GlobalAccessProvider";

const PrivateRoute = ({ requiredRoles, children }) => {
  const { user } = useGlobalAccess();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
