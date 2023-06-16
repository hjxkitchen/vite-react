import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../contexts/ThemeContext";
import Navbar from "../../components/system/Navbar";

import Footer from "../../components/system/Footer";

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
          {t("greeting")}
        </h1>
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Home;
