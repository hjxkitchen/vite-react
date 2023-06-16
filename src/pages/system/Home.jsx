import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
// import { ThemeToggle } from "../../components/system/ThemeToggle";
import ThemeContext from "../../ThemeContext";
import Navbar from "../../components/system/Navbar";
import { Button } from "../../ThemeStyles";

const Home = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <Navbar />
      {/* <ThemeToggle /> */}
      <h1 style={{ color: theme === "dark" ? "white" : "blue" }}>
        {t("greeting")}
      </h1>
      <Button theme={theme}>Click me</Button>
    </div>
  );
};

export default Home;
