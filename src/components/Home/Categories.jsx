import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import Loading from "../Loading";
import CategoryCard from "./CategoryCard";

export default function Categories() {
  const { categories, loading, error } = useCategories();

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-third py-5 text-center">
      <h2 className="text-primary-custom fw-bold mb-4">Explora categorías</h2>

      <div className="container">
        <div
          className="d-flex flex-row flex-nowrap overflow-auto gap-3 d-lg-grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            paddingBottom: "1rem",
          }}
        >
          {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      <style>{`
        .overflow-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
