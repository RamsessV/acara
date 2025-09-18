import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import Products from "./pages/Products";

function App() {
 return (
  <BrowserRouter>
   <Navbar />
    <ScrollToTop />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/:categoryId" element={<Products />} />
    <Route path="/products/search/:searchTerm" element={<Products />} />
   </Routes>
   <Footer />
  </BrowserRouter>
 );
}

export default App;
