import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// for proper nav functioning
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "./client_cra.css";
// import "./admin_cra.css";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
