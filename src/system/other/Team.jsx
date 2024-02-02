import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../contexts/ThemeContext";
import Navbar from "../Navbar";
import Footer from "../Footer";

import AddModal from "./components/AddModal";
// import EditModal from "../components/team/EditModal";
import List from "./components/TeamList";

import Upload from "../upload/Upload";
import UploadMultiple from "../upload/UploadMultiple";

const Home = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const [roles, setRoles] = useState([]);

  //   get token from cookie
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const getRoles = async () => {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/role",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    console.log("roles:", response.data);
    setRoles(response.data);
  };

  useEffect(() => {
    getRoles();
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
          {t("greeting")} Salud Team
        </h1>
        <AddModal roles={roles} />
        <div className="container">
          <List roles={roles} />
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
