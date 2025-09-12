export function ModeloImagen({ color }) {
  return (
    <div className="mb-3 text-center">
      <img
        src={color.url}
        alt={color.name}
        style={{
          width: "100%",
          maxWidth: 350,
          height: 220,
          objectFit: "cover",
          borderRadius: 12,
          border: `4px solid #333`,
          transition: "border 0.2s",
        }}
      />
      <div
        className={`alert ${
          color.stock > 0 ? "alert-success" : "alert-warning"
        } mt-2 w-75 mx-auto`}
        style={{ fontStyle: "italic", color: "#555" }}
      >
        {color.stock > 0
          ? "Disponible para entrega inmediata"
          : "Sobre pedido, tiempo aproximado: 5 -7 días"}
      </div>
    </div>
  );
}
