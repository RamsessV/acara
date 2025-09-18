import {Link} from "react-router-dom"; // o react-router-dom si usas React Router

export default function Footer() {
  return (
    <footer className="bg-primary-custom text-light pt-3 mb-0">
      <div className="container">
        <div className="row gy-4">
          {/* Sección de descripción */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold">Acara Bags</h5>
            <p className="small">
              La mejor selección de productos de calidad, con envío rápido y atención personalizada.
            </p>
          </div>

          {/* Sección de enlaces rápidos */}
          <div className="col-6 col-md-4">
            <h5 className="fw-bold">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/faq" className="text-light text-decoration-none">FAQ</Link>
              </li>
              <li>
                <Link to="/politica-privacidad" className="text-light text-decoration-none">Política de Privacidad</Link>
              </li>
              <li>
                <Link to="/envios-reembolsos" className="text-light text-decoration-none">Envíos y Reembolsos</Link>
              </li>
            </ul>
          </div>

          {/* Sección de contacto */}
          <div className="col-6 col-md-4">
            <h5 className="fw-bold">Contacto</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="https://instagram.com/acara.bags"
                  target="_blank"
                  className="text-light text-decoration-none"
                >
                  <i className="fab fa-instagram"></i> Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="bg-light mt-4" />

        {/* Derechos reservados */}
        <div className="text-center pb-3">
          <small>© {new Date().getFullYear()} Nuestra Tienda. Todos los derechos reservados.</small>
        </div>
      </div>

      <style>
        {`
        footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </footer>
  );
}
