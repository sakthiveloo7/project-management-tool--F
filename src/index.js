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
    <GoogleOAuthProvider clientId="1039676593480-7ogn6impo16cv2a4dbav3aqq8cidcr0g.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    <ToastContainer transition={Zoom} />
  </React.StrictMode>
);