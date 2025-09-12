import { useState, useEffect } from "react";

export function useCart() {
  const [carrito, setCarrito] = useState([]);

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

  const agregarProducto = (producto) => {
    const nuevo = [...carrito, producto];
    setCarrito(nuevo);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  const eliminarProducto = (index) => {
    const copia = [...carrito];
    copia.splice(index, 1);
    setCarrito(copia);
    localStorage.setItem("carrito", JSON.stringify(copia));
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  return { carrito, agregarProducto, eliminarProducto, total };
}
