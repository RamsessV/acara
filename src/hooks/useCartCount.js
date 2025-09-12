import { useEffect, useState } from "react";

export function useCartCount() {
  const [cartCount, setCartCount] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("carrito") || "[]");
    return storedCart.length;
  });

  useEffect(() => {
    const actualizarCarrito = () => {
      const storedCart = JSON.parse(localStorage.getItem("carrito") || "[]");
      setCartCount(storedCart.length);
    };

    window.addEventListener("carritoActualizado", actualizarCarrito);
    return () =>
      window.removeEventListener("carritoActualizado", actualizarCarrito);
  }, []);

  return cartCount;
}
