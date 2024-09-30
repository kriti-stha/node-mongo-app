import React from "react";
import reactDom from "react-dom";
import App from "./app";

const root = reactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
