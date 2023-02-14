import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PrivateComponent = ({ children }) => {
  let navigate = useNavigate();
  const [jwt, setJwt] = useState(localStorage.getItem("user"));
 
 
console.log(jwt,'jwt')
  return jwt ? <Outlet/> : <Navigate to="/login" />;
};

export default PrivateComponent;
