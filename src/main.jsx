import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserProvider from "./context/UserProvider.jsx";
import ProductProvider from "./context/ProductProvider.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';


ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <ProductProvider>
      <App />
    </ProductProvider>
  </UserProvider>
);
