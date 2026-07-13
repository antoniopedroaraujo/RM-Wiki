import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./scss/styles.scss";
import "bootstrap";
import App from "./App";
import { FavoritesProvider } from "./context/FavoritesProvider";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Elemento root não encontrado");
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
);