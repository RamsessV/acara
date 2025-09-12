import { Link } from "react-router-dom";
import { useCartCount } from "../../hooks/useCartCount";
import CategoriesDropdown from "../navbar/CategoriesDropDown";

export default function Navbar() {
 const cartCount = useCartCount();

 return (
  <nav className="navbar navbar-expand-lg bg-sec fixed-top navbar-dark fw-bold">
   <div className="container-fluid">
    <Link className="navbar-brand" to="/">
     Acara Bags
    </Link>

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
       <Link className="nav-link active" to="/">
        Inicio
       </Link>
      </li>

      <CategoriesDropdown />

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

      {/* Carrito (solo en móvil dentro del collapse) */}
      <li className="nav-item d-lg-none">
       <Link to="/carrito" className="nav-link d-flex align-items-center">
        <span className="position-relative me-2">
         <i className="fas fa-shopping-cart"></i>
         <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill cart-count"
          style={{ fontSize: "0.7rem",  }}
         >
          {cartCount}
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
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill cart-count">
       {cartCount}
      </span>
     </Link>
    </div>
   </div>
  </nav>
 );
}
