import React, { useState, useEffect, useContext, createContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Assuming you have already set up the i18n configuration

import { ThemeProvider } from "./contexts/ThemeContext";

// auth
import Account from "./system/auth/Account";
import Team from "./system/other/Team";
import Login from "./system/auth/Login";
import LoginAdmin from "./system/auth/LoginAdmin";
import Signup from "./system/auth/Signup";
import ProtectedRoute from "./system/auth/components/ProtectedRoute";
import Token from "./system/auth/components/Token";

// static
// import Home from "./system/static/Home";
import Settings from "./system/Settings";
import ContactUs from "./client_shop/other/Contact";

// ANCHOR ADMIN PAGES
// ADMIN PAGES
import NewDash from "./admin_shop/NewDash";

// COMMS
// import Contact from "./admin_shop/comms/Contact";
import Contacts from "./../src/system/other/Contacts";
import Contact from "./admin_shop/newpages/Contact";

// PRODUCTS
// import ShopList from "./admin_shop/products/Products";
import ShopList from "./admin_shop/products/Products";
// import Inventory from "./admin_shop/products/Inventory";
import SupplierProducts from "./admin_shop/products/Products";
import FeaturedAdmin from "./admin_shop/product_relations/Featured";
import PackagesAdmin from "./admin_shop/product_relations/Packages";
import Package from "./admin_shop/product_relations/Package";
import Categories from "./admin_shop/product_relations/Categories";
import Category from "./admin_shop/product_relations/Category";

// SALES
import SalesList from "./admin_shop/sales/AllSales";
import PrepSales from "./admin_shop/sales/PrepSales";
import SaleLogsAdmin from "./admin_shop/sales/SaleLogs";
import POSales from "./admin_shop/sales/PointOfSales";
import OnlineSales from "./admin_shop/sales/OnlineSales";
import Tools from "./admin_shop/sales/Tools";
import Jobs from "./admin_shop/sales/Jobs";

// import Users from "./admin_shop/sales/Users";
import Orders from "./admin_shop/supply/Orders";
import ReceiveOrders from "./admin_shop/supply/ReceiveOrders";
import OrderLogs from "./admin_shop/supply/OrderLogs";
import OrderCart from "./admin_shop/supply/OrderCart";
import OrderCheckout from "./admin_shop/supply/OrderCheckout";
import Suppliers from "./admin_shop/supply/Suppliers";
import Warehouses from "./admin_shop/warehouse/Warehouses";
import Warehouse from "./admin_shop/warehouse/Warehouse";
import WarehouseSections from "./admin_shop/warehouse/WarehouseSections";

// HOME PAGE

// MARKETING ADMINS
// outbound
import OutboundAdmin from "./admin_shop/marketing/outbound/OutboundAdmin";
import OutboundBroadcast from "./admin_shop/marketing/outbound/OutboundBroadcast";
import Billboards from "./admin_shop/marketing/outbound/Billboards";
import Philantropy from "./admin_shop/marketing/outbound/Philantropy";
import Sokoos from "./admin_shop/marketing/outbound/Sokoos";

// inbound
import InboundAdmin from "./admin_shop/marketing/inbound/InboundAdmin";
import InboundMessages from "./admin_shop/marketing/inbound/InboundMessages";
import InboundReply from "./admin_shop/marketing/inbound/InboundReply";

// ANCHOR CLIENT PAGES

// comms
import Blog from "./client_shop/other/Blog";
import About from "./client_shop/other/About";
// import Contact from "./client_shop/comms/Contact";

// products
import Product from "./client_shop/products/Product";
import Shop from "./client_shop/products/Shop";
import Featured from "./client_shop/products/Featured";
import Packages from "./client_shop/products/Packages";
import Favorites from "./client_shop/products/Favorites";
import ClientCategory from "./client_shop/products/Category";

// sales
import Cart from "./client_shop/sales/Cart";
import Checkout from "./client_shop/sales/Checkout";
import Calculators from "./client_shop/sales/Calculators";
import OrderHistory from "./client_shop/sales/OrderHistory";
import SaleLogs from "./client_shop/sales/SaleLogs";

// newpages
import RecentChats from "./admin_shop/newpages/RecentChats.jsx";
import Products from "./admin_shop/newpages/Products.jsx";
import Pos from "./admin_shop/newpages/Pos.jsx";
import Messages from "./admin_shop/newpages/Messages";
import Chats from "./admin_shop/newpages/Chats.jsx";
import WebMessages from "./admin_shop/newpages/WebMessages.jsx";
// import Contact from "./admin_shop/newpages/Contact.jsx";
import AdminBlog from "./admin_shop/newpages/Blog.jsx";
import OrderPos from "./admin_shop/supply/OrderPos.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
// import Cookies from "js-cookie";

export const UserContext = createContext();
export const ProdContext = createContext();
export const CartContext = createContext();
export const LoggedContext = createContext();
export const CategoryContext = createContext();
export const SubcatsContext = createContext();

const App = () => {
  // const [token, setToken] = useState("");

  const [cartToken, setCartToken] = React.useState(null);
  const [ProductNames, setProductNames] = useState([]);
  const [user, setUser] = React.useState(null);
  const [loggedin, setLoggedin] = React.useState(true);
  const [categories, setCategories] = React.useState(null);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    ? Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    : "guest";

  // product context name ids resolution
  const getProdContext = async () => {
    // const productnames = await fetch("http://localhost:000/products")
    const productnames = await axios.get(
      import.meta.env.VITE_API_URL +
        "/api/attr/product?attributes=product_name,product_id,model,size,barcode,price",
      {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    console.log("getting product names");
    const result = await productnames.data;
    console.log("product names", result);
    // const result2 = await productnames.data;
    setProductNames(result);
  };

  useEffect(() => {
    if (ProductNames.length == 0) {
      getProdContext();
    }
  }, []);

  const userRole = Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    ? JSON.parse(
        atob(Cookies.get(import.meta.env.VITE_COOKIE_NAME).split(".")[1])
      ).role_id
    : null;

  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          {/* <TokenContext.Provider value={token}> */}
          <UserContext.Provider value={user}>
            <ProdContext.Provider value={ProductNames}>
              <CategoryContext.Provider value={categories}>
                <SubcatsContext.Provider value={categories}>
                  <CartContext.Provider value={cartToken}>
                    <LoggedContext.Provider value={loggedin}>
                      <Routes>
                        <Route path="token" element={<Token />} />
                        <Route path="login" element={<Login token={token} />} />
                        <Route
                          path="adminlogin"
                          element={<LoginAdmin token={token} />}
                        />
                        <Route
                          path="signup"
                          element={<Signup token={token} />}
                        />

                        {userRole === 1 ? (
                          <Route
                            path="/"
                            element={
                              <ProtectedRoute
                                setUser={setUser}
                                token={token}
                                allowedRoles={[1]}
                              >
                                <NewDash />
                              </ProtectedRoute>
                            }
                          />
                        ) : userRole === 2 ? (
                          <Route path="/" element={<Shop />} />
                        ) : userRole === 3 ? (
                          <Route path="/" element={<POSales />} />
                        ) : userRole === 4 ? (
                          <Route path="/" element={<Shop />} />
                        ) : userRole === 5 ? (
                          <Route path="/" element={<Shop />} />
                        ) : userRole === 6 ? (
                          <Route path="/" element={<PrepSales />} />
                        ) : (
                          <Route path="/" element={<Shop />} />
                        )}
                        <Route
                          path="settings"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                                15,
                              ]}
                            >
                              <Settings />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="account"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                                15,
                              ]}
                            >
                              <Account />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="contact"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                                15,
                              ]}
                            >
                              <Contact />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="team"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Team />
                            </ProtectedRoute>
                          }
                        />

                        {/* CLIENT shop */}
                        <Route
                          path="shop"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Shop />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="shop/products/:id"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Product />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="featured"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Featured />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="packages"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Packages />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="calculators"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Calculators />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="blog"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Blog />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="about"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <About />
                            </ProtectedRoute>
                          }
                        />
                        {/* <Route path="contact" element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Contact />
                            </ProtectedRoute>
                          } /> */}
                        <Route
                          path="cart"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Cart />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="checkout"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Checkout />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="order_history"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <OrderHistory />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="sale_logs/:sale_id"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1, 5, 6]}
                            >
                              <SaleLogs />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="favorites"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Favorites />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="category/:category"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <ClientCategory />
                            </ProtectedRoute>
                          }
                        />

                        {/* ADMIN PAGES */}
                        {/* <Route path="admindash" element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <AdminDash />
                            </ProtectedRoute>
                          } /> */}

                        <Route
                          path="shoplist"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <ShopList />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="products"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Products />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="featuredadmin"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <FeaturedAdmin />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="packagesadmin"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <PackagesAdmin />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="package"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Package />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="categories"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Categories />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="category"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Category />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="allsales"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <SalesList />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="salelogs/:sale_id"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1, 6]}
                            >
                              <SaleLogsAdmin />
                            </ProtectedRoute>
                          }
                        />

                        {/* <Route path="users" element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Users />
                            </ProtectedRoute>
                          } /> */}

                        <Route
                          path="orders"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1, 6]}
                            >
                              <Orders />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="receiveorders"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1, 6]}
                            >
                              <ReceiveOrders />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="orderpos"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <OrderPos />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="orderlogs/:order_id"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1, 6]}
                            >
                              <OrderLogs />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="ordercart"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <OrderCart />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="ordercheckout"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <OrderCheckout />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="suppliers"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Suppliers />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="warehouses"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Warehouses />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="warehouse/:id"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Warehouse />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="warehouse/sections/:id"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <WarehouseSections />
                            </ProtectedRoute>
                          }
                        />

                        {/* <Route path="contact" element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Contact />
                            </ProtectedRoute>
                          } /> */}
                        <Route
                          path="contacts"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Contacts />
                            </ProtectedRoute>
                          }
                        />

                        {/* HOME PAGE */}
                        <Route
                          path="pointofsales"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <POSales />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="tools"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Tools />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="jobs"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Jobs />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="onlinesales"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <OnlineSales />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="procurement"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Orders />
                            </ProtectedRoute>
                          }
                        />
                        {/* MARKETING ADMINS */}
                        <Route
                          path="outboundadmin"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <OutboundAdmin />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="sokoos"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Sokoos />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="billboards"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Billboards />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="philantropy"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Philantropy />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="outboundbroadcast"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <OutboundBroadcast />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="inboundadmin"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <InboundAdmin />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="inboundmessages"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <InboundMessages />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="inboundreply"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <InboundReply />
                            </ProtectedRoute>
                          }
                        />

                        {/* newpages */}

                        <Route
                          path="/pos"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Pos />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/adminblogs"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <AdminBlog />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/messages"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Messages />
                            </ProtectedRoute>
                          }
                        />
                        {/* <Route
                          path="/contactus"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <ContactUs />
                            </ProtectedRoute>
                          }
                        /> */}
                        <Route path="/contactus" element={<ContactUs />} />

                        <Route
                          path="/contact/:id"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Contact />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/chats"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Chats />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/webmessages"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <WebMessages />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/products"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <Products />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/recentchats"
                          element={
                            <ProtectedRoute
                              setUser={setUser}
                              token={token}
                              allowedRoles={[1]}
                            >
                              <RecentChats />
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                    </LoggedContext.Provider>
                  </CartContext.Provider>
                </SubcatsContext.Provider>
              </CategoryContext.Provider>
            </ProdContext.Provider>
          </UserContext.Provider>
          {/* </TokenContext.Provider> */}
        </BrowserRouter>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default App;
