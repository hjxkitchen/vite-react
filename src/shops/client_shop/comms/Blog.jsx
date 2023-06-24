import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";
import { UserContext } from "../../index";

function Calculators() {
  const user = useContext(UserContext);
  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}
      <div>
        <h1 class="text-center mt-5">Blog / Resources</h1>
      </div>

      {/* blog */}
    </Fragment>
  );
}

export default Calculators;
