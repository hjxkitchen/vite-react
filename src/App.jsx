import React, { useState, useEffect, useContext, createContext } from "react";
import Cookies from "js-cookie";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Assuming you have already set up the i18n configuration

import { ThemeProvider } from "./contexts/ThemeContext";

// auth
import Account from "./system/auth/Account";
import Team from "./system/auth/Team";
import Login from "./system/auth/components/Login";
import ProtectedRoute from "./system/auth/components/ProtectedRoute";
import Token from "./system/auth/components/Token";

// static
import Home from "./system/static/Home";
import Settings from "./system/static/Settings";
import Contact from "./system/static/Contact";

// ANCHOR ADMIN PAGES
// socos pages
import SocosSuperAdmin from "./admin_shop/admin/Socos/SocosSuperAdmin";
import SocosClient from "./admin_shop/admin/Socos/SocosClient";
// ADMIN PAGES
import AdminDash from "./admin_shop/admin/oldAdminDash";
import SocosAdmin from "./admin_shop/admin/Socos/SocosDash";
import MultiNationalHQ from "./admin_shop/admin/MultiNationalHQ";
import LocationBranchHQ from "./admin_shop/admin/LocationBranchHQ";
import HusseinJXAdmin from "./admin_shop/admin/HusseinJXAdmin";
import Employees from "./admin_shop/admin/Employees";
import Employee from "./admin_shop/admin/Employee";
import Finance from "./admin_shop/admin/Finance";
import Legal from "./admin_shop/admin/Legal";
import InfoTech from "./admin_shop/admin/IT";
import BusDev from "./admin_shop/admin/BusDev";
import Recruiting from "./admin_shop/admin/Recruiting";
import CapitalOps from "./admin_shop/admin/Capitalops";
import Playbooks from "./admin_shop/admin/Playbooks";
import Playbook from "./admin_shop/admin/Playbook";

// COMMS
// import Contact from "./admin_shop/comms/Contact";
import Contacts from "./admin_shop/comms/Contacts";

// PRODUCTS
import ShopList from "./admin_shop/products/ShopList";
import Inventory from "./admin_shop/products/Inventory";
import SupplierProducts from "./admin_shop/products/SupplierProducts";
import FeaturedAdmin from "./admin_shop/products/Featured";
import PackagesAdmin from "./admin_shop/products/Packages";
import Package from "./admin_shop/products/Package";
import Categories from "./admin_shop/products/Categories";
import Category from "./admin_shop/products/Category";

// SALES
import SalesList from "./admin_shop/sales/AllSales";
import SaleLogsAdmin from "./admin_shop/sales/SaleLogs";
import POSales from "./admin_shop/sales/PointOfSales";
import OnlineSales from "./admin_shop/sales/OnlineSales";
import Tools from "./admin_shop/sales/Tools";

// import Users from "./admin_shop/sales/Users";
import Orders from "./admin_shop/products/Orders";
import OrderLogs from "./admin_shop/products/OrderLogs";
import Suppliers from "./admin_shop/products/Suppliers";

// HOME PAGE
import Deliveries from "./admin_shop/products/DeliveryJobs";
import Technicians from "./admin_shop/products/TechnicianJobs";

// MARKETING ADMINS
// outbound
import OutboundAdmin from "./marketing/outbound/OutboundAdmin";
import OutboundBroadcast from "./marketing/outbound/OutboundBroadcast";
import Billboards from "./marketing/outbound/Billboards";
import Philantropy from "./marketing/outbound/Philantropy";
import Sokoos from "./marketing/outbound/Sokoos";

// inbound
import InboundAdmin from "./marketing/inbound/InboundAdmin";
import InboundMessages from "./marketing/inbound/InboundMessages";
import InboundReply from "./marketing/inbound/InboundReply";

// ANCHOR CLIENT PAGES

// comms
import Blog from "./client_shop/comms/Blog";
import About from "./client_shop/comms/About";
// import Contact from "./client_shop/comms/Contact";

// products
import Product from "./client_shop/products/Product";
import Shop from "./client_shop/products/Shop";
import Featured from "./client_shop/products/Featured";
import Packages from "./client_shop/products/Packages";
import Favorites from "./client_shop/products/Favorites";

// sales
import Cart from "./client_shop/sales/Cart";
import Checkout from "./client_shop/sales/Checkout";
import Calculators from "./client_shop/sales/Calculators";
import OrderHistory from "./client_shop/sales/OrderHistory";
import SaleLogs from "./client_shop/sales/SaleLogs";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const UserContext = createContext();
export const ProdContext = createContext();
export const TokenContext = createContext();
export const CartContext = createContext();
export const LoggedContext = createContext();
export const CategoryContext = createContext();
export const SubcatsContext = createContext();

const App = () => {
  const [token, setToken] = useState("");

  const [cartToken, setCartToken] = React.useState(null);
  const [ProductNames, setProductNames] = useState([]);
  const [user, setUser] = React.useState("kelvin@gmail.com");
  const [loggedin, setLoggedin] = React.useState(true);
  const [categories, setCategories] = React.useState(null);

  useEffect(() => {
    const storedToken = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
    console.log("getting token from cookie", storedToken);
    if (storedToken) {
      console.log("setting token", storedToken);
      setToken(storedToken);
      const decodedToken = jwt_decode(storedToken);
      console.log("decoded token", decodedToken);
      setUser({
        user_id: decodedToken.user_id,
        username: decodedToken.username,
        role_id: decodedToken.role_id,
      });
    }
  }, []);

  // product context name ids resolution
  const getProdContext = async () => {
    const productnames = await fetch("http://localhost:5000/products");
    const result = await productnames.json();
    // const result2 = await productnames.data;
    setProductNames(result);
  };

  if (ProductNames.length == 0) {
    getProdContext();
  }

  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <TokenContext.Provider value={token}>
            <UserContext.Provider value={user}>
              <ProdContext.Provider value={ProductNames}>
                <CategoryContext.Provider value={categories}>
                  <SubcatsContext.Provider value={categories}>
                    <CartContext.Provider value={cartToken}>
                      <LoggedContext.Provider value={loggedin}>
                        <Routes>
                          <Route path="token" element={<Token />} />
                          <Route
                            path="login"
                            element={
                              <Login setToken={setToken} token={token} />
                            }
                          />
                          <Route
                            path="/"
                            element={
                              <ProtectedRoute
                                token={token}
                                allowedRoles={[1, 2]}
                              >
                                {/* <Home /> */}
                                <AdminDash />
                                {/* <Shop /> */}
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="settings"
                            element={
                              <ProtectedRoute
                                token={token}
                                allowedRoles={[1, 2]}
                              >
                                <Settings />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="account"
                            element={
                              <ProtectedRoute
                                token={token}
                                allowedRoles={[1, 2]}
                              >
                                <Account />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="contact"
                            element={
                              <ProtectedRoute
                                token={token}
                                allowedRoles={[1, 2]}
                              >
                                <Contact />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="team"
                            element={
                              <ProtectedRoute token={token} allowedRoles={[1]}>
                                <Team />
                              </ProtectedRoute>
                            }
                          />

                          {/* CLIENT shop */}
                          <Route path="shop" element={<Shop />} />
                          <Route
                            path="shop/products/:id"
                            element={<Product />}
                          />
                          <Route path="featured" element={<Featured />} />
                          <Route path="packages" element={<Packages />} />
                          <Route path="calculators" element={<Calculators />} />
                          <Route path="blog" element={<Blog />} />
                          <Route path="about" element={<About />} />
                          {/* <Route path="contact" element={<Contact />} /> */}
                          <Route path="cart" element={<Cart />} />
                          <Route path="checkout" element={<Checkout />} />
                          <Route
                            path="order_history"
                            element={<OrderHistory />}
                          />
                          <Route path="sale_logs" element={<SaleLogs />} />
                          <Route path="favorites" element={<Favorites />} />

                          {/* ADMIN PAGES */}
                          <Route path="admindash" element={<AdminDash />} />
                          <Route
                            path="locationbranchhq"
                            element={<LocationBranchHQ />}
                          />
                          <Route
                            path="multinationalhq"
                            element={<MultiNationalHQ />}
                          />
                          <Route path="hjxadmin" element={<HusseinJXAdmin />} />

                          <Route path="inventory" element={<Inventory />} />
                          <Route path="shoplist" element={<ShopList />} />
                          <Route
                            path="products"
                            element={<SupplierProducts />}
                          />
                          <Route
                            path="featuredadmin"
                            element={<FeaturedAdmin />}
                          />
                          <Route
                            path="packagesadmin"
                            element={<PackagesAdmin />}
                          />
                          <Route path="package" element={<Package />} />
                          <Route path="categories" element={<Categories />} />
                          <Route path="category" element={<Category />} />

                          <Route path="allsales" element={<SalesList />} />
                          <Route path="salelogs" element={<SaleLogsAdmin />} />
                          {/* <Route path="users" element={<Users />} /> */}

                          <Route path="orders" element={<Orders />} />
                          <Route path="orderlogs" element={<OrderLogs />} />
                          <Route path="suppliers" element={<Suppliers />} />

                          <Route path="employee" element={<Employee />} />
                          <Route path="employees" element={<Employees />} />
                          <Route path="capitalops" element={<CapitalOps />} />
                          <Route path="finance" element={<Finance />} />
                          <Route path="legal" element={<Legal />} />
                          <Route path="infotech" element={<InfoTech />} />
                          <Route path="busdev" element={<BusDev />} />
                          <Route path="recruiting" element={<Recruiting />} />
                          {/* <Route path="contact" element={<Contact />} /> */}
                          <Route path="contacts" element={<Contacts />} />

                          {/* HOME PAGE */}
                          <Route path="pointofsales" element={<POSales />} />
                          <Route path="tools" element={<Tools />} />
                          <Route path="playbooks" element={<Playbooks />} />
                          <Route path="playbook" element={<Playbook />} />
                          <Route path="onlinesales" element={<OnlineSales />} />
                          <Route path="procurement" element={<Orders />} />
                          <Route path="deliveries" element={<Deliveries />} />
                          <Route path="technicians" element={<Technicians />} />
                          {/* MARKETING ADMINS */}
                          <Route
                            path="outboundadmin"
                            element={<OutboundAdmin />}
                          />
                          <Route path="sokoos" element={<Sokoos />} />
                          <Route path="billboards" element={<Billboards />} />
                          <Route path="philantropy" element={<Philantropy />} />
                          <Route
                            path="outboundbroadcast"
                            element={<OutboundBroadcast />}
                          />
                          <Route
                            path="inboundadmin"
                            element={<InboundAdmin />}
                          />
                          <Route
                            path="inboundmessages"
                            element={<InboundMessages />}
                          />
                          <Route
                            path="inboundreply"
                            element={<InboundReply />}
                          />

                          {/* ANCHOR SOCOS ROUTES */}
                          <Route path="socos" element={<SocosAdmin />} />
                          <Route path="socosclient" element={<SocosClient />} />
                          <Route
                            path="socossuperadmin"
                            element={<SocosSuperAdmin />}
                          />
                        </Routes>
                      </LoggedContext.Provider>
                    </CartContext.Provider>
                  </SubcatsContext.Provider>
                </CategoryContext.Provider>
              </ProdContext.Provider>
            </UserContext.Provider>
          </TokenContext.Provider>
        </BrowserRouter>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default App;
