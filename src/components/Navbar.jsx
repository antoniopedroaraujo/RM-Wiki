import { Link, NavLink } from "react-router-dom";
import { useFavorites } from "../context/useFavorites";
import rickLogo from "../assets/rick.svg";

function Navbar() {

  const { favorites } = useFavorites();  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold logo" to="/">
        <img src={rickLogo} alt="Ícone" className="logo-icon" />
          Rick & Morty Wiki
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
                <img width="48" height="48" src="https://img.icons8.com/plasticine/100/morty-smith.png" alt="morty-smith"/>
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
                <img width="48" height="48" src="https://img.icons8.com/3d-fluency/94/tv.png" alt="tv"/>
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
                <img width="48" height="48" src="https://img.icons8.com/color/48/earth-planet--v1.png" alt="earth-planet--v1"/>
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
                <img width="48" height="48" src="https://img.icons8.com/plasticine/100/plambus.png" alt="plambus" />
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