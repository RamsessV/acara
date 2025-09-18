export default function Hero({ onButtonClick }) {
  return (
    <section className="d-flex flex-column justify-content-center align-items-center text-center bg-secondary-2 text-white py-5" style={{ minHeight: "60vh" }}>
      <div className="container">
        <h2 className="fw-bold display-5">Eleva tu estilo</h2>
        <p className="mt-3 mb-4 fs-5">
          Descubre las últimas tendencias en bolsos y accesorios para mujeres.
          Compra ahora y encuentra tu combinación perfecta.
        </p>
        <button className="btn btn-light rounded-pill px-4 py-2 fw-bold bg-third" onClick={onButtonClick}>
          Explora lo más nuevo
        </button>
      </div>
    </section>
  );
}
