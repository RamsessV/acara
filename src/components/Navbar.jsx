import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [cart, setCart] = React.useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("carrito") || "[]");
    return storedCart.length;
  });

  React.useEffect(() => {
    const actualizarCarrito = () => {
      const storedCart = JSON.parse(localStorage.getItem("carrito") || "[]");
      setCart(storedCart.length);
    };

    window.addEventListener("carritoActualizado", actualizarCarrito);
    return () => window.removeEventListener("carritoActualizado", actualizarCarrito);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Acara Bags</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Inicio</Link>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              >
                Categorías
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/categoria/1" state={{cname: "Bolsos"}}>Bolsos</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categoria/3" state={{cname: "Tarjeteros"}}>Tarjeteros</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categoria/7" state={{cname: "Porta Lentes"}}>Porta Lentes</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">Más</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                href="https://www.instagram.com/acara.bags/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <i className="fab fa-instagram"></i> Síguenos en Instagram
              </a>
            </li>
            {/* Carrito (visible solo en móvil dentro del collapse) */}
            <li className="nav-item d-lg-none">
              <Link to="/carrito" className="nav-link d-flex align-items-center">
                <span className="position-relative me-2">
                  <i className="fas fa-shopping-cart"></i>
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cart}
                    <span className="visually-hidden">productos en el carrito</span>
                  </span>
                </span>
                Carrito
              </Link>
            </li>
          </ul>
          {/* Carrito (a la derecha en pantallas grandes) */}
          <Link
            to="/carrito"
            className="nav-link d-none d-lg-block ms-auto position-relative text-white"
          >
            <i className="fas fa-shopping-cart fa-lg"></i>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {cart}
              <span className="visually-hidden text-white">productos en el carrito</span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
