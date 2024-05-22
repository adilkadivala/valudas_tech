import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ValudasStorage } from "./context/Storage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ValudasStorage>
      <App />
    </ValudasStorage>
  </React.StrictMode>
);
