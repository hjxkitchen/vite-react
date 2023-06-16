import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../../components/system/ui/ThemeToggle";
import ThemeContext from "../../contexts/ThemeContext";
import Navbar from "../../components/system/Navbar";
import LanguageToggle from "../../components/system/ui/LanguageToggle";
import LogoutButton from "../../components/system/LogoutButton";
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
        {/* <Button theme={theme}>Click me</Button> */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
