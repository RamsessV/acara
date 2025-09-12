import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/icon.jpeg'; // Ajusta la ruta a tu logo

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Información de la tienda con logo */}
          <div className="col-md-4 mb-3 d-flex align-items-center">
            <img src={logo} alt="Acara Bags" style={{ width: 60, marginRight: 10 }} />
            <div>
              <h5 className="fw-bold mb-1">Acara Bags</h5>
              <p className="mb-1">Bolsos artesanales hechos con amor.</p>
              <small>© 2025 Acara Bags. Todos los derechos reservados.</small>
            </div>
          </div>

          {/* Navegación interna */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Enlaces rápidos</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none">Inicio</Link>
              </li>
              <li>
                <Link to="/categoria/1" className="text-white text-decoration-none">Bolsos</Link>
              </li>
              <li>
                <Link to="/categoria/3" className="text-white text-decoration-none">Tarjeteros</Link>
              </li>
              <li>
                <Link to="/categoria/7" className="text-white text-decoration-none">Porta Lentes</Link>
              </li>
              <li>
                <Link to="/faq" className="text-white text-decoration-none">Preguntas Frecuentes</Link>
              </li>
            </ul>
          </div>

          {/* Redes sociales y contacto externo */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Síguenos</h6>
            <p>Síguenos para más novedades</p>
            <a
              href="https://www.instagram.com/acara.bags/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-3"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>

            <h6 className="mt-3 fw-bold">Contacto</h6>
            <a
              href="https://wa.me/3123103107"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white fs-4"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <p className="mb-0 mt-1">Horario: Lunes a Viernes, 9am - 6pm</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
