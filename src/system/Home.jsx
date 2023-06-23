import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import ThemeContext from "../contexts/ThemeContext";
import Navbar from "../system/components/Navbar";
import Footer from "../system/components/Footer";

import AddModal from "./../system/components/crud/AddModal";
import EditModal from "../system/components/crud/EditModal";
import List from "../system/components/crud/List";

import Upload from "../system/components/upload/Upload";
import UploadMultiple from "../system/components/upload/UploadMultiple";

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
