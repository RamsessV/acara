import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ModeloPersonalizar() {
  const { id } = useParams();
  const [modelo, setModelo] = useState(null);
  const [colores, setColores] = useState([]);
  const [color, setColor] = useState(null);

  const [mostrarIniciales, setMostrarIniciales] = useState(false);
  const [iniciales, setIniciales] = useState("");

  // Inputs de letras
  const [tamanos, setTamanos] = useState([]);
  const [letrasData, setLetrasData] = useState([]);
  const [tamanoLetra, setTamanoLetra] = useState("");
  const [colorLetra, setColorLetra] = useState("");

  // Filtrar colores según tamaño
  const coloresDisponibles = letrasData
    .filter((l) => l.size === tamanoLetra)
    .map((l) => l.color)
    .filter((value, index, self) => self.indexOf(value) === index); // únicos

  // Validar stock de letras
  const letrasValidas = iniciales.split("").every((l) => {
  if (l === "Ñ") return true; // estrella
  const letraData = letrasData.find(
    (item) =>
      item.letter === l &&
      item.size === tamanoLetra &&
      item.color === colorLetra
  );
  if (!letraData) return false;

  // Contar cuántas veces aparece esta letra en las iniciales
  const ocurrencias = iniciales.split("").filter((x) => x === l).length;
  return letraData.stock >= ocurrencias;
});

  // Para habilitar el botón solo si la personalización es válida
  

  useEffect(() => {
    async function fetchModelo() {
      const { data, error } = await supabase
        .from("modelos")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) setModelo(data);
    }

    async function fetchColores() {
      const { data, error } = await supabase
        .from("colores")
        .select("*")
        .eq("modelo", id);
      if (!error && data) {
        setColores(data);
        if (data.length > 0) setColor(data[0]);
      }
    }

    async function fetchLetras() {
      const { data, error } = await supabase.from("letras").select("*");
      if (!error && data) setLetrasData(data);
      // Obtener tamaños disponibles
      const sizes = [...new Set(data.map((l) => l.size))];
      setTamanos(sizes);
      if (sizes.length > 0) setTamanoLetra(sizes[0]);
    }

    fetchModelo();
    fetchColores();
    fetchLetras();
  }, [id]);

  function handleIniciales(e) {
    // Permitir solo letras y la "ñ" como estrella
    let val = e.target.value.toUpperCase().replace(/[^A-ZÑ]/g, "");
    val = val.slice(0, modelo?.max || 4);
    setIniciales(val);
  }

  function handleMostrarIniciales(valor) {
    setMostrarIniciales(valor);
    if (!valor) {
      setIniciales("");
      setTamanoLetra(tamanos[0] || "");
      setColorLetra("");
    }
  }
  

  function agregarAlCarrito() {
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
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.dispatchEvent(new Event("carritoActualizado"));
    alert("¡Producto agregado al carrito!");
  }

  if (!modelo || !color) {
    return (
      <div className="container" style={{ marginTop: "5rem" }}>
        <div className="alert alert-info">Cargando modelo...</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "5rem", maxWidth: 500 }}>
      <h2 className="mb-3 text-center">{modelo.name}</h2>

      {/* Imagen del color seleccionado */}
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
          className={`alert ${color.stock > 0 ? "alert-success" : "alert-warning"} mt-2 w-75 mx-auto`}
          style={{ fontStyle: "italic", color: "#555" }}
        >
          {color.stock > 0 ? "Disponible para entrega inmediata" : "Sobre pedido, tiempo aproximado: 5 -7 días"}
        </div>
      </div>

      {/* Características */}
      <div className="mb-4 text-center">
        <p>
          <strong>Precio:</strong> ${modelo.precio}
        </p>
      </div>

      {/* Selector de color producto (ignorado) */}
      <div className="mb-4">
        <div className="mb-2 fw-bold">Elige el color:</div>
        <div className="d-flex gap-3">
          {colores.map((c) => (
            <div key={c.id} className="text-center">
              <button
                className="border-0 rounded-circle"
                style={{
                  width: 36,
                  height: 36,
                  backgroundImage: `url(${c.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  outline: color.id === c.id ? "3px solid #333" : "none",
                  cursor: "pointer",
                }}
                onClick={() => setColor(c)}
                aria-label={c.name}
                title={c.name}
              />
              <div style={{ fontSize: "0.75rem", marginTop: 4 }}>{c.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Iniciales */}
      <div className="mb-3">
        <div className="mb-2 fw-bold">¿Deseas añadir tus iniciales?</div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="iniciales"
            id="no"
            checked={!mostrarIniciales}
            onChange={() => handleMostrarIniciales(false)}
          />
          <label className="form-check-label" htmlFor="no">
            No
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="iniciales"
            id="si"
            checked={mostrarIniciales}
            onChange={() => handleMostrarIniciales(true)}
          />
          <label className="form-check-label" htmlFor="si">
            Sí
          </label>
        </div>
      </div>

      {mostrarIniciales && (
        <div className="mb-3">
          <label className="form-label">Iniciales (si quieres agregar una estrella, escribe "Ñ"):</label>
          <label className="form-label">Maximo de caracteres: {modelo?.max || 4}</label>
          <input
            type="text"
            className="form-control"
            value={iniciales}
            onChange={handleIniciales}
            maxLength={modelo?.max || 4}
            style={{ textTransform: "uppercase", width: 120 }}
            placeholder="ABCÑ"
          />

          {/* Tamaño */}
          <div className="mt-2">
            <label className="form-label">Tamaño:</label>
            <select
              className="form-select"
              value={tamanoLetra}
              onChange={(e) => {
                setTamanoLetra(e.target.value);
                setColorLetra("");
              }}
            >
              {tamanos.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2">
  <label className="form-label">Color de letra:</label>
  <div className="d-flex gap-2 mt-1">
    {coloresDisponibles.map((c) => {
      let bg = c === "oro" ? "gold" : c === "plata" ? "silver" : "black";
      const seleccionado = colorLetra === c;
      return (
        <div
          key={c}
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: 28,
            height: 28,
            backgroundColor: bg,
            cursor: "pointer",
            border: seleccionado ? "3px solid #333" : "1px solid #ccc",
          }}
          onClick={() => setColorLetra(c)}
          title={c}
        >
          {seleccionado && (
            <span style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}>✓</span>
          )}
        </div>
      );
    })}
  </div>
</div>

          {!letrasValidas && (
            <div className="alert alert-warning mt-2">
              Letras no disponibles en stock, sobre pedido
            </div>
          )}
        </div>
      )}

      {/* Medidas */}
      <div className="mb-4 text-center d-flex align-items-center gap-2">
        <div>
          <strong>Alto:</strong> {modelo.alto} cm
        </div>
        <div>
          <strong>Ancho:</strong> {modelo.ancho} cm
        </div>
        <div>
          <strong>Largo:</strong> {modelo.largo} cm
        </div>
      </div>

      <button className="btn btn-dark w-100" disabled={[iniciales, tamanoLetra, colorLetra].some((v) => !v) && mostrarIniciales} onClick={agregarAlCarrito}>
        Agregar al carrito
      </button>
    </div>
  );
}
