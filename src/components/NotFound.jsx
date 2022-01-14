import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    //eslint-disable-next-line
  }, []);

  return <div></div>;
}

export default NotFound;
