// this component reads token from url and sets it as cookie then redirects

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Token = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    const token = url.split("token=")[1];
    Cookies.set(import.meta.env.VITE_COOKIE_NAME, token);
    window.location.href = "/";
  }, []);

  return <>token to cookie</>;
};

export default Token;
