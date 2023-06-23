import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import EditModal from "./EditModal";
import Cookies from "js-cookie";
import ThemeContext from "../../../contexts/ThemeContext";

const List = () => {
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
    <div>
      {" "}
      {products.map((product) => (
        <div className="card mt-4" key={product.id}>
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{product.price}</h6>
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
  );
};

export default List;
