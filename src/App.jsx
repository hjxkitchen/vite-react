import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Assuming you have already set up the i18n configuration

import { ThemeProvider } from "./contexts/ThemeContext";

// BASIC ACCOUNT PAGES
import Signup from "./system/auth/Signup";
import Login from "./system/auth/components/Login";
import Account from "./system/auth/Account";
import ProtectedRoute from "./system/auth/components/ProtectedRoute";
import Token from "./system/auth/components/Token";
import Settings from "./system/static/Settings";
import Team from "./system/auth/Team";
// import Home from "./system/static/Home";
// import Contact from "./system/Contact";

// MAIN PAGES
import AdminDash from "./shops/admin_shop/admin/AdminDash";
import SocosAdmin from "./shops/admin_shop/admin/SocosDash";
import MultiNationalHQ from "./shops/admin_shop/admin/MultiNationalHQ";
import LocationBranchHQ from "./shops/admin_shop/admin/LocationBranchHQ";
import HusseinJXAdmin from "./shops/admin_shop/admin/HusseinJXAdmin";

// ADMIN pages
import CapitalOps from "./shops/admin_shop/admin/Capitalops";

import Finance from "./shops/admin_shop/admin/Finance";
import Legal from "./shops/admin_shop/admin/Legal";
import InfoTech from "./shops/admin_shop/admin/IT";
import BusDev from "./shops/admin_shop/admin/BusDev";
import Recruiting from "./shops/admin_shop/admin/Recruiting";

// PRODUCTS
import ShopList from "./shops/admin_shop/products/ShopList";
// import Inventory from "./shops/admin_shop/products/products";
// import Products from "./shops/admin_shop/products/productsList";
import Featured from "./shops/admin_shop/products/Featured";
import Packages from "./shops/admin_shop/products/Packages";
import Package from "./shops/admin_shop/products/Package";
import Categories from "./shops/admin_shop/products/Categories";
import Category from "./shops/admin_shop/products/Category";

import SalesList from "./shops/admin_shop/sales/AllSales";
import SaleLogs from "./shops/admin_shop/sales/SaleLogs";
// import Users from "./shops/admin_shop/sales/Users";
import POSales from "./shops/admin_shop/sales/PointOfSales";
import OnlineSales from "./shops/admin_shop/sales/OnlineSales";

// import Orders from "./shops/admin_shop/pages/admin/fulfillment/procurement/Orders";
// import OrderLogs from "./shops/admin_shop/pages/admin/fulfillment/procurement/OrderLogs";
// import Suppliers from "./shops/admin_shop/pages/admin/fulfillment/procurement/Suppliers";

import Employees from "./shops/admin_shop/admin/Employees";
import Employee from "./shops/admin_shop/admin/Employee";
// import Contact from "./shops/admin_shop/pages/admin/admin/Contact";
// import Contacts from "./shops/admin_shop/pages/admin/admin/Contacts";

// HOME PAGE
import Tools from "./shops/admin_shop/sales/Tools";
// import Deliveries from "./shops/admin_shop/pages/admin/fulfillment/drivers/DeliveryJobs";
// import Technicians from "./shops/admin_shop/pages/admin/fulfillment/technicians/TechnicianJobs";
// MARKETING ADMINS
import OutboundAdmin from "./shops/marketing/outbound/OutboundAdmin";
import Sokoos from "./shops/marketing/outbound/Sokoos";
import Billboards from "./shops/marketing/outbound/Billboards";
import Philantropy from "./shops/marketing/outbound/Philantropy";
import OutboundBroadcast from "./shops/marketing/outbound/OutboundBroadcast";
import InboundAdmin from "./shops/marketing/inbound/InboundAdmin";
import InboundMessages from "./shops/marketing/inbound/InboundMessages";
import InboundReply from "./shops/marketing/inbound/InboundReply";

// ANCHOR OLD REACT ZAHAB PAGES

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
    console.log("getting token from cookie", storedToken);
    if (storedToken) {
      console.log("setting token", storedToken);
      setToken(storedToken);
    }
  }, []);

  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Routes>
            <Route path="token" element={<Token />} />
            <Route
              path="login"
              element={<Login setToken={setToken} token={token} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute token={token} allowedRoles={[1, 2]}>
                  <AdminDash />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute token={token} allowedRoles={[1, 2]}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="account"
              element={
                <ProtectedRoute token={token} allowedRoles={[1, 2]}>
                  <Account />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="contact"
              element={
                <ProtectedRoute token={token} allowedRoles={[1, 2]}>
                  <Contact />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="team"
              element={
                <ProtectedRoute token={token} allowedRoles={[1]}>
                  <Team />
                </ProtectedRoute>
              }
            />
            {/* ADMIN PAGES */}
            {/* <Route path="inventory" element={<Inventory />} /> */}
            <Route path="shoplist" element={<ShopList />} />
            {/* <Route path="products" element={<Products />} /> */}
            <Route path="featured" element={<Featured />} />
            <Route path="packages" element={<Packages />} />
            <Route path="package" element={<Package />} />
            <Route path="categories" element={<Categories />} />
            <Route path="category" element={<Category />} />

            <Route path="allsales" element={<SalesList />} />
            <Route path="salelogs" element={<SaleLogs />} />
            {/* <Route path="users" element={<Users />} /> */}

            {/* <Route path="orders" element={<Orders />} /> */}
            {/* <Route path="orderlogs" element={<OrderLogs />} /> */}
            {/* <Route path="suppliers" element={<Suppliers />} /> */}

            <Route path="employee" element={<Employee />} />
            <Route path="employees" element={<Employees />} />
            <Route path="capitalops" element={<CapitalOps />} />
            <Route path="finance" element={<Finance />} />
            <Route path="legal" element={<Legal />} />
            <Route path="infotech" element={<InfoTech />} />
            <Route path="busdev" element={<BusDev />} />
            <Route path="recruiting" element={<Recruiting />} />
            {/* <Route path="contact" element={<Contact />} /> */}
            {/* <Route path="contacts" element={<Contacts />} /> */}

            {/* HOME PAGE */}
            <Route path="pointofsales" element={<POSales />} />
            <Route path="tools" element={<Tools />} />
            <Route path="onlinesales" element={<OnlineSales />} />
            {/* <Route path="procurement" element={<Orders />} /> */}
            {/* <Route path="deliveries" element={<Deliveries />} /> */}
            {/* <Route path="technicians" element={<Technicians />} /> */}
            {/* MARKETING ADMINS */}
            <Route path="outboundadmin" element={<OutboundAdmin />} />
            <Route path="sokoos" element={<Sokoos />} />
            <Route path="billboards" element={<Billboards />} />
            <Route path="philantropy" element={<Philantropy />} />
            <Route path="outboundbroadcast" element={<OutboundBroadcast />} />
            <Route path="inboundadmin" element={<InboundAdmin />} />
            <Route path="inboundmessages" element={<InboundMessages />} />
            <Route path="inboundreply" element={<InboundReply />} />
          </Routes>
        </BrowserRouter>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default App;
