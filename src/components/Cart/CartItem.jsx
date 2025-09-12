export default function CartItem({ item, onEliminar }) {
  return (
    <div className="cart-item">
      {/* Icono bote de basura */}
      <i className="fas fa-trash-can cart-item-eliminar" onClick={onEliminar}></i>

      <img src={item.img} alt={item.name} />
      <div className="cart-item-info">
        <h5>{item.name}</h5>
        <p><strong>Color:</strong> {item.color}</p>
        {item.iniciales ? (
          <p>
            <strong>Iniciales:</strong> {item.iniciales} <br />
            <strong>Tamaño letra:</strong> {item.tamanoLetra || "-"} <br />
            <strong>Color letra:</strong> {item.colorLetra || "-"}
          </p>
        ) : (
          <p className="text-muted">Sin iniciales</p>
        )}
        <p><strong>Precio:</strong> ${item.precio}</p>
      </div>
    </div>
  );
}
