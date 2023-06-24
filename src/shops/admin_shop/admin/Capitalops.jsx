import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import PublicNavbar from "../../../components/PublicNavbar";
import { UserContext } from "../../../index";

function Component() {
  const user = useContext(UserContext);
  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}

      {/* button for finance */}
      <h1 class="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
        Capital Ops
      </h1>
      <div class="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
        <Link
          to="/finance"
          class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
        >
          Financials
        </Link>
        <Link
          to="/legal"
          class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
        >
          Legal Tickets
        </Link>
        <Link
          to="/infotech"
          class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
        >
          IT Tickets
        </Link>
      </div>
      <div class="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
        <Link
          to="/busdev"
          class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
        >
          Bus Dev
        </Link>
      </div>
    </Fragment>
  );
}

export default Component;
