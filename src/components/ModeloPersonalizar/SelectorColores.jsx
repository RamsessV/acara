export function SelectorColores({ colores, color, setColor }) {
  return (
    <div className="mb-4">
      <div className="mb-2 fw-bold">Elige el color:</div>
      <div className="d-flex gap-3">
        {colores.map((c) => (
          <div key={c.id} className="text-center">
            <button
              className="border-0 rounded-circle"
              style={{
                width: 36,
                height: 36,
                backgroundImage: `url(${c.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                outline: color.id === c.id ? "3px solid #333" : "none",
                cursor: "pointer",
              }}
              onClick={() => setColor(c)}
              aria-label={c.name}
              title={c.name}
            />
            <div style={{ fontSize: "0.75rem", marginTop: 4 }}>{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
