import React from "react";
import {  Navigate, Outlet } from "react-router-dom";
import { Context } from "../context/AuthContext";
const PrivateRoute = () => {
  const { currentUser } = Context();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
