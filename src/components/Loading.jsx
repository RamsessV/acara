export default function Loading({ message = "Cargando..." }) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "200px" }}
    >
      <div
        className="spinner"
        style={{
          width: "50px",
          height: "50px",
          border: "6px solid #eee",
          borderTop: "6px solid #eae4d5",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: "1rem",
        }}
      ></div>
      <span className="text-primary-custom fw-semibold">{message}</span>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
