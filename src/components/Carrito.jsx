import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [enviando, setEnviando] = useState(false);

  function generarCodigoCompra() {
    return 'ACARA-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  }

  // Cargar carrito desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(stored);
  }, []);

  // Escuchar cambios globales al carrito
  useEffect(() => {
    const actualizar = () => {
      const stored = JSON.parse(localStorage.getItem("carrito") || "[]");
      setCarrito(stored);
    };
    window.addEventListener("carritoActualizado", actualizar);
    return () => window.removeEventListener("carritoActualizado", actualizar);
  }, []);

  const eliminarProducto = (index) => {
    const copia = [...carrito];
    copia.splice(index, 1);
    setCarrito(copia);
    localStorage.setItem("carrito", JSON.stringify(copia));
  };

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  if (carrito.length === 0) {
    return (
      <div className="container" style={{ marginTop: "5rem", maxWidth: 600 }}>
        <div className="alert alert-info text-center">Tu carrito está vacío</div>
      </div>
    );
  }

  const handleFinalizarCompra = async () => {
    if (!nombre || !telefono || carrito.length === 0) return;
    setEnviando(true);

    const codigo = generarCodigoCompra();

    // Insert en Supabase
    const { data, error } = await supabase
      .from("pedidos")
      .insert([
        {
          codigo,
          productos: carrito,
          usuario: nombre,
          telefono
        }
      ]);

    setEnviando(false);

    if (error) {
      alert("Error al enviar pedido: " + error.message);
    } else {
      // Limpiar carrito y campos
      setCarrito([]);
      localStorage.removeItem("carrito");
      setNombre("");
      setTelefono("");

      // Redirigir a WhatsApp
      const mensaje = encodeURIComponent(
        `Hola, mi código de compra es: ${codigo}\nNombre: ${nombre}\nTeléfono: ${telefono}\nCantidad de productos: ${carrito.length}\nTotal: $${total}`
      );
      window.dispatchEvent(new Event("carritoActualizado"));
      window.open(`https://wa.me/3123103107?text=${mensaje}`, "_blank");
    }
  };

  return (
    <div className="container" style={{ marginTop: "5rem", maxWidth: 600 }}>
      <h2 className="mb-4 text-center">Carrito de Compras</h2>

      {carrito.map((item, index) => (
        <div key={index} className="card mb-3" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1rem", padding: "0.5rem" }}>
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
          <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(index)}>
            Eliminar
          </button>
        </div>
      ))}

      {/* Inputs de nombre y teléfono */}
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input 
          type="text" 
          className="form-control" 
          value={nombre} 
          onChange={e => setNombre(e.target.value)} 
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input 
          type="tel" 
          className="form-control" 
          value={telefono} 
          onChange={e => setTelefono(e.target.value)} 
        />
      </div>

      <div className="text-start fw-bold fs-5 mt-3">
        Total: ${total}
      </div>
      <div className="text-end fw-bold fs-5 mt-3">
        Envío: {carrito.length > 2 ? "Envío gratis" : "Obtén tu código de compra para continuar con el pago"}
      </div>

      {/* Botón de finalizar compra */}
      <button 
        className="btn btn-success mt-3" 
        disabled={!nombre || !telefono || enviando} 
        onClick={handleFinalizarCompra}
      >
        {enviando ? "Enviando..." : "Finalizar Compra en WhatsApp"}
      </button>
    </div>
  );
}
