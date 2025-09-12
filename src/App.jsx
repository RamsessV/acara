import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CategoryList from "./pages/CategoryList";
import CategoriaDetalle from "./pages/CategoriaDetalle";
import ModeloPersonalizar from "./pages/ModeloPersonalizar";
import Carrito from "./pages/Carrito";
import Footer from "./components/Footer";
import FAQ from "./pages/FAQ";

function App() {
 return (
  <BrowserRouter>
   <Navbar />
   <Routes>
    <Route path="/" element={<CategoryList />} />
    <Route path="/categoria/:id" element={<CategoriaDetalle />} />
    <Route path="/modelo/:id" element={<ModeloPersonalizar />} />
    <Route path="/carrito" element={<Carrito />} />
    <Route path="/faq" element={<FAQ />} />
   </Routes>
   <Footer />
  </BrowserRouter>
 );
}

export default App;
