import useCategories from "../../hooks/useCategories";

export default function Filter({ onCategorySelect, selectedCategory }) {
  const { categories } = useCategories();

  return (
    <div className="p-3 bg-white rounded shadow-sm border" style={{ maxWidth: '100%' }}>
      <h5 className="mb-3 text-center fw-bold">Filtrar por categoría</h5>
      <div className="d-flex flex-wrap justify-start gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            className={
              "btn btn-sm text-truncate " +
              (selectedCategory === category.id
                ? "bg-fourth text-white fw-bold"
                : "bg-accent")
            }
            style={{
              flex: '0 0 auto',
              minWidth: '70px',
              maxWidth: 'calc(50% - 0.5rem)',
            }}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.name}
          </button>
        ))}
        <button
          key="all"
          className={
            "btn btn-sm text-truncate " +
            (selectedCategory === null ? "bg-fourth text-white fw-bold" : "bg-accent")
          }
          style={{
            flex: '0 0 auto',
            minWidth: '70px',
            maxWidth: 'calc(50% - 0.5rem)',
          }}
          onClick={() => onCategorySelect(null)}
        >
          Todos
        </button>
      </div>
    </div>
  );
}