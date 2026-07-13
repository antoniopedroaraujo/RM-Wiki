import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./scss/styles.scss";
import "bootstrap";
import App from "./App.jsx";
import { FavoritesProvider } from "./context/FavoritesProvider.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
);
