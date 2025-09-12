import { useParams, useLocation } from "react-router-dom";
import { useModelsByCategory } from "../hooks/useModelByCategory";
import ModeloCard from "../components/CategoriaDetalle/ModelCard";

export default function CategoriaDetalle() {
  const { id } = useParams();
  const location = useLocation();
  const cname = location.state?.cname || "Categoría";

  const { modelos, loading } = useModelsByCategory(id);

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <h2 className="mb-4">Explora {cname}</h2>

      {loading ? (
        <div className="text-center">Cargando modelos...</div>
      ) : modelos.length === 0 ? (
        <div className="alert alert-info text-center">
          No hay modelos para esta categoría.
        </div>
      ) : (
        <div className="row g-4">
          {modelos.map((modelo) => (
            <ModeloCard key={modelo.id} {...modelo} />
          ))}
        </div>
      )}
    </div>
  );
}
