import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import EditModal from "./EditModal";
import Cookies from "js-cookie";
import ThemeContext from "../../../contexts/ThemeContext";

const List = ({ roles }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  //   get products
  const [products, setProducts] = useState([]);

  //   get token from cookie
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  useEffect(() => {
    // GET WITH AXIOS HEADERS
    axios
      .get(import.meta.env.VITE_API_URL + "/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })

      .then((response) => {
        console.log(response.data);
        // get userroles
        axios
          .get(import.meta.env.VITE_API_URL + "/api/userrole", {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          })
          .then((roleResponse) => {
            console.log(roleResponse.data);

            // Combine user data with user roles
            const usersWithRoles = response.data.map((user) => {
              const userRole = roleResponse.data.find(
                (role) => role.user_id === user.user_id
              );
              const role_id = userRole ? userRole.role_id : null;
              return { ...user, role_id };
            });

            console.log("uwrole:", usersWithRoles);

            // only set the users whose role is 1
            const filteredUsers = usersWithRoles.filter(
              (user) => user.role_id !== 2
            );

            console.log(filteredUsers);
            setProducts(filteredUsers);

            // console.log(response.data);
            // setProducts(usersWithRoles);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, []);

  //   delete product
  const handleDelete = (id) => {
    // prompt are you sure
    // if (alert("are you sure?")) {
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/user/" + id, {
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
    // }
  };

  return (
    <div>
      {" "}
      {products.map((product) => (
        <div className="card mt-4" key={product.user_id}>
          <div className="card-body">
            <h5 className="card-title">
              {product.user_id}: {product.username}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Role: {product.role_id}
              {/* get role_name from roles where id is product.role_id */}
              {roles.map((role) => (
                <div key={role.role_id}>
                  {role.role_id === product.role_id ? role.name : ""}
                </div>
              ))}
            </h6>
            {/* <p className="card-text">{product.password}</p> */}
          </div>
          <div className="card-footer">
            {/* EDIT, DELETE BUTTON */}
            <EditModal product={product} />
            <button
              className={"btn btn-" + theme + " mt-4 mb-4"}
              onClick={() => handleDelete(product.user_id)}
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
