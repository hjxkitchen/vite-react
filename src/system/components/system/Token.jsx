// this component reads token from url and sets it as cookie then redirects

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

const Token = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    // const token = url.split("token=")[1];
    const token = jwt.sign(
      { userId: 2, roleId: 1, username: "jane_doe" },
      "your_secret_key"
    );
    Cookies.set("token", token);
    window.location.href = "/";
  }, []);

  return <>token to cookie</>;
};

export default Token;
