import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import ThemeContext from "../contexts/ThemeContext";
import Navbar from "../system/components/Navbar";
import Footer from "../system/components/Footer";

import AddModal from "./../system/components/crud/AddModal";
import EditModal from "../system/components/crud/EditModal";

import Upload from "../system/components/upload/Upload";
import UploadMultiple from "../system/components/upload/UploadMultiple";

const Home = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  //   get products
  const [products, setProducts] = useState([]);

  //   get token from cookie
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  useEffect(() => {
    // GET WITH AXIOS HEADERS
    axios
      .get(import.meta.env.VITE_API_URL + "/api/Product", {
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

  //   delete product
  const handleDelete = (id) => {
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/Product/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          {t("greeting")} Salud
        </h1>
        <Upload />
        <UploadMultiple />
        <AddModal />
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
              <div className="card-footer">
                {/* EDIT, DELETE BUTTON */}
                <EditModal product={product} />
                <button
                  className={"btn btn-" + theme + " mt-4 mb-4"}
                  onClick={() => handleDelete(product.id)}
                >
                  {t("delete")}
                </button>
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
