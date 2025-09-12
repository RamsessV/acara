import { useParams } from "react-router-dom";
import { useState } from "react";
import { useModel } from "../hooks/useModel";
import { useColors } from "../hooks/useColors";
import { useLetters } from "../hooks/useLetters";
import { useCart } from "../hooks/useCart";

import { ModeloImagen } from "../components/ModeloPersonalizar/ModeloImagen";
import { SelectorColores } from "../components/ModeloPersonalizar/SelectorColores";
import { InicialesForm } from "../components/ModeloPersonalizar/InicialesForm";
import { Medidas } from "../components/ModeloPersonalizar/Medidas";

export default function ModeloPersonalizar() {
  const { id } = useParams();
  const modelo = useModel(id);
  const { colores, color, setColor } = useColors(id);
  const { letrasData, tamanos } = useLetters();
  const { agregarProducto } = useCart();

  const [mostrarIniciales, setMostrarIniciales] = useState(false);
  const [iniciales, setIniciales] = useState("");
  const [tamanoLetra, setTamanoLetra] = useState("grande");
  const [colorLetra, setColorLetra] = useState("");

  const agregarAlCarrito = () => {
    if (!modelo || !color) return;

    const producto = {
      id: modelo.id,
      c_id: color.id,
      name: modelo.name,
      color: color?.name,
      iniciales: mostrarIniciales ? iniciales : "",
      tamanoLetra: mostrarIniciales ? tamanoLetra : "",
      colorLetra: mostrarIniciales ? colorLetra : "",
      precio: modelo.precio,
      img: color?.url || modelo.img,
    };

    agregarProducto(producto);

    // Mostrar toast Bootstrap
    const toastEl = document.getElementById("carritoToast");
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  };

  if (!modelo || !color) {
    return (
      <div className="container" style={{ marginTop: "5rem" }}>
        <div className="alert alert-info shadow-sm">Cargando modelo...</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "5rem", maxWidth: 500 }}>
      <h2 className="mb-4 text-center fw-bold text-uppercase">{modelo.name}</h2>

      <ModeloImagen color={color} />

      <p className="text-center fs-5 mt-3">
        <strong>Precio:</strong>{" "}
        <span className="text-warning fw-bold">${modelo.precio}</span>
      </p>

      <SelectorColores colores={colores} color={color} setColor={setColor} />

      <InicialesForm
        mostrarIniciales={mostrarIniciales}
        setMostrarIniciales={setMostrarIniciales}
        iniciales={iniciales}
        setIniciales={setIniciales}
        tamanos={tamanos}
        tamanoLetra={tamanoLetra}
        setTamanoLetra={setTamanoLetra}
        colorLetra={colorLetra}
        setColorLetra={setColorLetra}
        letrasData={letrasData}
        modelo={modelo}
      />

      <Medidas modelo={modelo} />

      <button
        className="btn btn-premium w-100 mt-3"
        disabled={[iniciales, tamanoLetra, colorLetra].some((v) => !v) && mostrarIniciales}
        onClick={agregarAlCarrito}
      >
        🛒 Agregar al carrito
      </button>

      {/* Toast Bootstrap */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="carritoToast"
          className="toast bg-dark text-white border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body">🛍️ ¡Producto agregado al carrito!</div>
        </div>
      </div>
    </div>
  );
}
