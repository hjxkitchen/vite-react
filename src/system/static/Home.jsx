import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../contexts/ThemeContext";
import Navbar from "../Navbar";
import Footer from "../Footer";

import AddModal from "./../auth/components/AddModal";
import EditModal from "../auth/components/EditModal";
import List from "../auth/components/List";

import Upload from "../upload/Upload";
import UploadMultiple from "../upload/UploadMultiple";

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
          {t("greeting")} Salud
        </h1>
        <Upload />
        <UploadMultiple />
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
