import { Link, NavLink } from "react-router-dom";
import { Collapse } from "bootstrap";
import { useFavorites } from "../context/useFavorites";
import rickLogo from "../assets/rick.svg";

function Navbar() {

  const { favorites } = useFavorites(); 
  
  const closeMenu = () => {
    const navbar = document.getElementById("navbarNav");

    if (navbar && navbar.classList.contains("show")) {
      const bsCollapse = Collapse.getOrCreateInstance(navbar);
      bsCollapse.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
      <div className="container-fluid px-4">
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
        <div className="collapse navbar-collapse mobile-center-menu" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold" : ""}`
                }
              >
                <img width="48" height="48" src="https://img.icons8.com/plasticine/100/morty-smith.png" alt="morty-smith"/>
                Personagens
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/episodes"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold" : ""}`
                }
              >
                <img width="48" height="48" src="https://img.icons8.com/3d-fluency/94/tv.png" alt="tv"/>
                Episódios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/locations"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold" : ""}`
                }
              >
                <img width="48" height="48" src="https://img.icons8.com/color/48/earth-planet--v1.png" alt="earth-planet--v1"/>
                Localizações
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/favorites"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold" : ""}`
                }
              >
                <img width="48" height="48" src="https://img.icons8.com/plasticine/100/plambus.png" alt="plambus" />
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
