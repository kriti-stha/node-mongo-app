import App from "app";
import React from "react";
import reactDom from "react-dom";

const root = reactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
