import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../contexts/ThemeContext";
import Navbar from "../../system/Navbar";
import Footer from "../../system/Footer";

import AddModal from "./components/AddModal";
// import EditModal from "../components/team/EditModal";
import List from "./components/TeamList";

import Upload from "../../system/upload/Upload";
import UploadMultiple from "../../system/upload/UploadMultiple";

const Home = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

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
        <AddModal />
        <div className="container">
          <List />
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
