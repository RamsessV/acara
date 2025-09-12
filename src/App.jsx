import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CategoryList from "./components/CategoryList";
// Importa tu componente de detalle de categoría
import CategoriaDetalle from "./components/CategoriaDetalle";
import ModeloPersonalizar from "./components/ModeloPersonalizar";
import Carrito from "./components/Carrito";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <img
  src="/src/assets/bg.jpeg"
  alt="Fondo"
  style={{
    display: "block",
    margin: "2rem auto", // centrado horizontal y con margen superior
    maxWidth: "95%", // evita que se salga de la pantalla
    borderRadius: 12,  // opcional: esquinas redondeadas
    marginTop: "5rem"  // espacio desde la parte superior
  }}
/>
      <Routes>
        <Route path="/" element={<CategoryList />} />
        <Route path="/categoria/:id" element={<CategoriaDetalle />} />
        <Route path="/modelo/:id" element={<ModeloPersonalizar />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;