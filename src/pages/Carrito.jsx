import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../hooks/useCart";
import CarritoItem from "../components/Cart/CartItem";

export default function Carrito() {
  const { carrito, eliminarProducto, total } = useCart();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [enviando, setEnviando] = useState(false);

  const generarCodigoCompra = () => 'ACARA-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

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

    // Limpiar carrito y campos
    localStorage.removeItem("carrito");
    window.dispatchEvent(new Event("carritoActualizado"));
    setNombre("");
    setTelefono("");

    // Redirigir a WhatsApp
    const mensaje = encodeURIComponent(
      `Hola, mi código de compra es: ${codigo}\nNombre: ${nombre}\nTeléfono: ${telefono}\nCantidad de productos: ${carrito.length}\nTotal: $${total}`
    );
    window.open(`https://wa.me/3123103107?text=${mensaje}`, "_blank");
  };

  if (carrito.length === 0) {
    return (
      <div className="container" style={{ marginTop: "5rem", maxWidth: 600 }}>
        <div className="alert alert-info text-center">Tu carrito está vacío</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "5rem", maxWidth: 600 }}>
      <h2 className="mb-4 text-center">Carrito de Compras</h2>

      {carrito.map((item, index) => (
        <CarritoItem key={index} item={item} onEliminar={() => eliminarProducto(index)} />
      ))}

      {/* Inputs de nombre y teléfono */}
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input type="tel" className="form-control" value={telefono} onChange={e => setTelefono(e.target.value)} />
      </div>

      <div className="text-start fw-bold fs-5 mt-3">Total: ${total}</div>
      <div className="text-end fw-bold fs-5 mt-3">
        Envío: {carrito.length > 2 ? "Envío gratis" : "Obtén tu código de compra para continuar con el pago"}
      </div>

      <button className="btn btn-success mt-3" disabled={!nombre || !telefono || enviando} onClick={handleFinalizarCompra}>
        {enviando ? "Enviando..." : "Finalizar Compra en WhatsApp"}
      </button>
    </div>
  );
}
