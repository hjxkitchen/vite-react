import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../system/Navbar";
// import PublicNavbar from "../PublicNavbar";
import { UserContext } from "../../App";

function Calculators() {
  const user = useContext(UserContext);
  return (
    <Fragment>
      <Navbar />
      <div>
        <h1 class="text-center mt-5">Blog / Resources</h1>
      </div>

      {/* blog */}
    </Fragment>
  );
}

export default Calculators;
