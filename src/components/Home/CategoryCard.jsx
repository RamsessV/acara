import { Link } from "react-router-dom"

export default function CategoryCard({ category }) {
  return (
    <Link to={`/products/${category.id}`} className="text-decoration-none">
    <div
      className="flex-shrink-0 card border-0 text-center shadow-sm p-3 bg-secondary-custom"
      style={{
        minWidth: "140px",
        maxWidth: "160px",
        height: "180px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={category.img}
        alt={category.name}
        className="mb-2"
        style={{
          width: "100%",
          height: "120px",
          objectFit: "cover",
          borderRadius: "0.5rem",
        }}
      />
      <h6 className="text-primary-custom small fw-semibold mt-auto">
        {category.name}
      </h6>
    </div>
    </Link>
  );
}
