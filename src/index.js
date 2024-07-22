import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider  clientId="459718214021-84fgkbjcaj4c44ir0eua9rku2sbjj9k5.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    <ToastContainer transition={Zoom} />
  </React.StrictMode>
);