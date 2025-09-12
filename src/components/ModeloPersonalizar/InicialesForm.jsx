export function InicialesForm({
  mostrarIniciales,
  setMostrarIniciales,
  iniciales,
  setIniciales,
  tamanos,
  tamanoLetra,
  setTamanoLetra,
  colorLetra,
  setColorLetra,
  letrasData,
  modelo,
}) {
  const coloresDisponibles = letrasData
    .filter((l) => l.size === tamanoLetra)
    .map((l) => l.color)
    .filter((v, i, self) => self.indexOf(v) === i);

  const letrasValidas = iniciales.split("").every((l) => {
    if (l === "Ñ") return true;
    const letraData = letrasData.find(
      (item) =>
        item.letter === l && item.size === tamanoLetra && item.color === colorLetra
    );
    if (!letraData) return false;
    const ocurrencias = iniciales.split("").filter((x) => x === l).length;
    return letraData.stock >= ocurrencias;
  });

  function handleIniciales(e) {
    let val = e.target.value.toUpperCase().replace(/[^A-ZÑ]/g, "");
    val = val.slice(0, modelo?.max || 4);
    setIniciales(val);
  }

  return (
    <>
      <div className="mb-3">
        <div className="mb-2 fw-bold">¿Deseas añadir tus iniciales?</div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="iniciales"
            checked={!mostrarIniciales}
            onChange={() => setMostrarIniciales(false)}
          />
          <label className="form-check-label">No</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="iniciales"
            checked={mostrarIniciales}
            onChange={() => setMostrarIniciales(true)}
          />
          <label className="form-check-label">Sí</label>
        </div>
      </div>

      {mostrarIniciales && (
        <div className="mb-3">
          <label className="form-label">
            Iniciales (máx: {modelo?.max || 4})
          </label>
          <input
            type="text"
            className="form-control"
            value={iniciales}
            onChange={handleIniciales}
            maxLength={modelo?.max || 4}
            style={{ textTransform: "uppercase", width: 120 }}
            placeholder="ABCÑ"
          />

          {/* Tamaño */}
          <div className="mt-2">
            <label className="form-label">Tamaño:</label>
            <select
              className="form-select"
              value={tamanoLetra}
              onChange={(e) => {
                setTamanoLetra(e.target.value);
                setColorLetra("");
              }}
            >
              {tamanos.map((t, i) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Color */}
          <div className="mt-2">
            <label className="form-label">Color de letra:</label>
            <div className="d-flex gap-2 mt-1">
              {coloresDisponibles.map((c) => {
                let bg = c === "oro" ? "gold" : c === "plata" ? "silver" : "black";
                const seleccionado = colorLetra === c;
                return (
                  <div
                    key={c}
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: 28,
                      height: 28,
                      backgroundColor: bg,
                      cursor: "pointer",
                      border: seleccionado ? "3px solid #333" : "1px solid #ccc",
                    }}
                    onClick={() => setColorLetra(c)}
                  >
                    {seleccionado && (
                      <span style={{ color: "#fff", fontSize: 14 }}>✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {!letrasValidas && (
            <div className="alert alert-warning mt-2">
              Letras no disponibles en stock, sobre pedido
            </div>
          )}
        </div>
      )}
    </>
  );
}
