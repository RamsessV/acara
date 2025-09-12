import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from("categorias")
        .select("id, name, img");
      if (!error && data) setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <h2 className="mb-4">Conoce nuestros productos</h2>
      <div className="row g-4">
        {categories.map((category) => (
          <div key={category.id} className="col-12 col-md-6 col-lg-4">
            <button
              className="w-100 p-0 border-0 bg-transparent"
              onClick={() => navigate(`/categoria/${category.id}`, {state: {cname: category.name}})}
            >
              <div
                className="rounded shadow d-flex align-items-end"
                style={{
                  height: "220px",
                  backgroundImage: `url(${category.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  className="w-100 text-white p-3"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    letterSpacing: "1px",
                    textShadow: "0 2px 8px #000",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                  }}
                >
                  {category.name}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}