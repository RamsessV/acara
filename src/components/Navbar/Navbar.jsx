import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/products/search/${searchTerm}`);
      setSearchTerm("");
      setShowSearch(false);
      setMenuOpen(false); // opcional: cerrar menú si estaba abierto
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container-fluid">
        {/* Toggler móvil */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Logo */}
        <a className="navbar-brand fw-bold mx-auto" href="/">
          Acara Bags
        </a>

        {/* Iconos a la derecha */}
        <div className="d-flex align-items-center">
          {/* Icono de búsqueda */}
          <div className="position-relative">
            <button
              className="btn btn-link text-dark"
              onClick={() => setShowSearch(!showSearch)}
            >
              <i className="bi bi-search"></i>
            </button>

            {showSearch && (
              <input
                type="text"
                className="form-control position-absolute end-0"
                style={{ top: "100%", width: "200px" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                placeholder="Buscar..."
              />
            )}
          </div>

          <button className="btn btn-link text-dark">
            <i className="bi bi-bag"></i>
          </button>
        </div>

        {/* Menú */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={closeMenu}>
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products/1" onClick={closeMenu}>
                Bolsos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products/2" onClick={closeMenu}>
                Carteras
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products" onClick={closeMenu}>
                Todos nuestros productos
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
