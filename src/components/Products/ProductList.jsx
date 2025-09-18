import { useState, useEffect } from "react";
import { useSearchAndCategory } from "../../hooks/useProducts";
import Loading from "../Loading";
import ProductCard from "./ProductCard";
import Filter from "./Filter";

export default function ProductList({ categoryId = null, searchTerm = null }) {
    const [selectedCategory, setSelectedCategory] = useState(categoryId);
    const [search, setSearch] = useState(searchTerm);
    const { products, loading, error } = useSearchAndCategory(search, selectedCategory);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        setSelectedCategory(categoryId);
        setSearch(searchTerm);
    }, [categoryId, searchTerm]);

    // Ordenamiento
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" o "desc"

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // cantidad de productos por página
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Ordena los productos según el orden seleccionado
    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.precio - b.precio;
        } else {
            return b.precio - a.precio;
        }
    });

    // Productos que se mostrarán en la página actual
    const currentProducts = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) return <Loading />;
    if (error)
        return (
            <div className="alert alert-danger" role="alert">
                Error loading products: {error.message}
            </div>
        );

    if(searchTerm && products.length === 0) {
        return <div className="alert bg-accent text-center mt-5" role="alert">
                    No se encontraron resultados para <strong>{searchTerm}</strong>.
                </div>;
    }
    return (
        <div className="container my-4">
            {/* Encabezado con botón de filtros y ordenamiento */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    className="btn bg-secondary-2 btn-sm d-flex align-items-center"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <span className="me-1">Filtros</span>
                    <i className="bi bi-funnel"></i>
                </button>
                <div>
                    <label className="me-2 fw-semibold">Ordenar por precio:</label>
                    <select
                        className="form-select form-select-sm  d-inline-block"
                        style={{ width: 160 }}
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Menor a mayor</option>
                        <option value="desc">Mayor a menor</option>
                    </select>
                </div>
            </div>

            {showFilters && (
                <div className="card card-body mb-4">
                    <Filter
                        onCategorySelect={(id) => {
                            setSelectedCategory(id);
                            setCurrentPage(1);
                            setSearch(null); // reset página al cambiar categoría
                        }}
                        selectedCategory={selectedCategory}
                    />
                </div>
            )}

            {/* Grid de productos */}
            <div className="row g-3">
                {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <nav className="d-flex justify-content-center mt-4">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link bg-accent text-primary-custom" onClick={() => handlePageChange(currentPage - 1)}>
                                &laquo;
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                <button
                                    className={`page-link ${
                                        currentPage === i + 1 ? "bg-fourth text-secondary-custom" : "bg-accent text-primary-custom"
                                    }`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button className="page-link bg-accent text-primary-custom" onClick={() => handlePageChange(currentPage + 1)}>
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}