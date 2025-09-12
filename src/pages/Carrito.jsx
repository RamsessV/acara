import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../hooks/useCart";
import CarritoItem from "../components/Cart/CartItem";
export default function Carrito() {
  const { carrito, eliminarProducto, total } = useCart();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [enviando, setEnviando] = useState(false);

  const generarCodigoCompra = () =>
    'ACARA-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

  const handleFinalizarCompra = async () => {
    if (!nombre || !telefono || carrito.length === 0) return;
    setEnviando(true);

    const codigo = generarCodigoCompra();

    const { error } = await supabase.from("pedidos").insert([
      { codigo, productos: carrito, usuario: nombre, telefono }
    ]);

    setEnviando(false);

    if (error) {
      alert("Error al enviar pedido: " + error.message);
      return;
    }

    localStorage.removeItem("carrito");
    window.dispatchEvent(new Event("carritoActualizado"));
    setNombre("");
    setTelefono("");

    const mensaje = encodeURIComponent(
      `Hola, mi código de compra es: ${codigo}\nNombre: ${nombre}\nTeléfono: ${telefono}\nCantidad de productos: ${carrito.length}\nTotal: $${total}`
    );
    window.open(`https://wa.me/3123103107?text=${mensaje}`, "_blank");
  };

  if (carrito.length === 0) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: "5rem", minHeight: "60vh" }}>
        <div className="carrito-vacio">Tu carrito está vacío</div>
      </div>
    );
  }

  return (
    <div className="container carrito-container">
      <h2 className="carrito-titulo">Carrito de Compras</h2>

      <div className="carrito-items">
        {carrito.map((item, index) => (
          <CarritoItem
            key={index}
            item={item}
            onEliminar={() => eliminarProducto(index)}
            className="carrito-item"
          />
        ))}
      </div>

      <div className="carrito-input mb-3">
        <label>Nombre</label>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
      </div>
      <div className="carrito-input mb-3">
        <label>Teléfono</label>
        <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} />
      </div>

      <div className="carrito-resumen">
        <span>Total: ${total}</span>
        <span className="carrito-envio">
          {carrito.length > 2 ? "Envío gratis" : "Obtén tu código de compra para continuar con el pago"}
        </span>
      </div>

      <button
        className="carrito-boton mt-4"
        disabled={!nombre || !(/^\d{10}$/.test(telefono)) || enviando}
        onClick={handleFinalizarCompra}
      >
        {enviando ? "Enviando..." : "Finalizar Compra en WhatsApp"}
      </button>
    </div>
  );
}
