import { Link, NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritosContext";

function Navbar() {

  const { favorites } = useFavorites();  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Rick and Morty
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold" : ""}`
                }
              >
                Personagens
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/episodes"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold" : ""}`
                }
              >
                Episódios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/locations"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold" : ""}`
                }
              >
                Localizações
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold" : ""}`
                }
              >
                Favoritos
                {favorites.length > 0 && (
                    <span className="badge bg-danger ms-2">
                        {favorites.length}
                    </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;