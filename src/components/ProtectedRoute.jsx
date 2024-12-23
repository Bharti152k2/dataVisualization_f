import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Authentication";

function ProtectedRoute({ children }) {
  let { auth } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (!auth.isLoggedIn) {
    // return <Navigate to="/login" />;
    return token ? children : <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
