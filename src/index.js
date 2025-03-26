import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use createRoot for React 18+
import App from "./App";
import "./index.css"; // Ensure CSS is correctly imported

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Correct way for React 18
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
