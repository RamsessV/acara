export default function CartItem({ item, onEliminar }) {
  return (
    <div className="card mb-3 d-flex flex-row align-items-center p-2" style={{ gap: "1rem" }}>
      <img src={item.img} alt={item.name} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }} />
      <div style={{ flex: 1 }}>
        <h5>{item.name}</h5>
        <p className="mb-1"><strong>Color:</strong> {item.color}</p>
        {item.iniciales ? (
          <p className="mb-1">
            <strong>Iniciales:</strong> {item.iniciales} <br />
            <strong>Tamaño letra:</strong> {item.tamanoLetra || "-"} <br />
            <strong>Color letra:</strong> {item.colorLetra || "-"}
          </p>
        ) : (
          <p className="mb-1 text-muted">Sin iniciales</p>
        )}
        <p className="mb-0"><strong>Precio:</strong> ${item.precio}</p>
      </div>
      <button className="btn btn-danger btn-sm" onClick={onEliminar}>Eliminar</button>
    </div>
  );
}
