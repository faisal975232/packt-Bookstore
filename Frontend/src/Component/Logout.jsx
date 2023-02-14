import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();
  console.log("Logging out");
  localStorage.removeItem("user");

  useEffect(() => {
    navigate("/login");
  }, []);

  return <div></div>;
};

export default Logout;
