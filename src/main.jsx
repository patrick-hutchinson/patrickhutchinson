import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GlobalStateProvider } from "./assets/context/GlobalStateContext"; // Adjust path as necessary
import "./assets/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </StrictMode>
);
