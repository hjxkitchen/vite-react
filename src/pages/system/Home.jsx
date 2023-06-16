import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../contexts/ThemeContext";
import Navbar from "../../components/system/Navbar";

import Footer from "../../components/system/Footer";

const Home = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  //   get products
  const [products, setProducts] = useState([]);

  //   get token from cookie
  const token = Cookies.get("token");

  useEffect(() => {
    // GET WITH AXIOS HEADERS
    axios
      .get("http://localhost:3000/api/Product", {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className=" mainbods ">
        {/* <ThemeToggle />
        <LanguageToggle />
        <LogoutButton /> */}
        <h1
          className="mt-5 text-center"
          style={{ color: theme === "dark" ? "black" : "grey" }}
        >
          {t("greeting")}
        </h1>
        <div className="container">
          {products.map((product) => (
            <div className="card mt-4" key={product.id}>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {product.price}
                </h6>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Home;
