import {useCategories} from "../hooks/useCategories";
import CategoryCard from "../components/Categories/CategoryCard";

export default function CategoryList() {
  const categories = useCategories();

  return (
    <div className="container" style={{ marginTop: "4rem" }}>
      <h2 className="mb-4">Conoce nuestros productos</h2>
      <div className="row g-5">
        {categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </div>
  );
}
