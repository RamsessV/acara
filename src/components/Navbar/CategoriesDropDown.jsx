import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Bolsos" },
  { id: 3, name: "Tarjeteros" },
  { id: 7, name: "Porta Lentes" },
];

export default function CategoriesDropdown() {
  return (
    <li className="nav-item dropdown">
      <span
        className="nav-link dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ cursor: "pointer" }}
      >
        Categorías
      </span>
      <ul className="dropdown-menu">
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              className="dropdown-item"
              to={`/categoria/${cat.id}`}
              state={{ cname: cat.name }}
            >
              {cat.name}
            </Link>
          </li>
        ))}
        <li>
          <Link className="dropdown-item" to="/">
            Más
          </Link>
        </li>
      </ul>
    </li>
  );
}
