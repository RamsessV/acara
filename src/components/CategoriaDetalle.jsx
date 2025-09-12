import { useParams, useNavigate, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CategoriaDetalle() {
  const { id } = useParams();
  const location = useLocation();
  const cname = location.state?.cname;
  const [modelos, setModelos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchModelos() {
      const { data, error } = await supabase
        .from("modelos")
        .select("*")
        .eq("categoria", id);
      if (!error && data) setModelos(data);
    }
    fetchModelos();
  }, [id]);

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <h2 className="mb-4">Explora {cname}</h2>
      <div className="row g-4">
        {modelos.map((modelo) => (
          <div key={modelo.id} className="col-6 col-md-6 col-lg-4">
            <button
              className="card h-100 shadow p-0 border-0 bg-transparent"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/modelo/${modelo.id}`)}
            >
              <img
                src={modelo.img}
                alt={modelo.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{modelo.name}</h5>
                <div className="mt-auto">
                  <span className="fw-bold text-success fs-5">
                    ${modelo.precio}
                  </span>
                </div>
              </div>
            </button>
          </div>
        ))}
        {modelos.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No hay modelos para esta categoría.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}