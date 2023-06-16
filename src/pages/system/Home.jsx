import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/system/Navbar";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <h1>{t("greeting")}</h1>
    </div>
  );
};

export default Home;
