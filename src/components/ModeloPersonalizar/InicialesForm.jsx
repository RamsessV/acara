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
    const letraData = letrasData.find(
      (item) =>
        item.letter === l &&
        item.size === tamanoLetra &&
        item.color === colorLetra
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
    <div className="card shadow-sm border-0 rounded-3 mb-3 form-iniciales">
      <div className="card-body">
        {/* Pregunta inicial */}
        <h5 className="fw-bold mb-3">
          ¿Deseas añadir tus iniciales?
        </h5>
        <div className="d-flex gap-4 mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="iniciales"
              checked={!mostrarIniciales}
              onChange={() => setMostrarIniciales(false)}
              id="noIniciales"
            />
            <label className="form-check-label" htmlFor="noIniciales">
              No
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="iniciales"
              checked={mostrarIniciales}
              onChange={() => setMostrarIniciales(true)}
              id="siIniciales"
            />
            <label className="form-check-label" htmlFor="siIniciales">
              Sí
            </label>
          </div>
        </div>

        {mostrarIniciales && (
          <div className="animate-fadeIn">
            {/* Input Iniciales */}
            <label className="form-label fw-semibold">
              Iniciales (máx: {modelo?.max || 4}) Ñ para estrella
            </label>
            <input
              type="text"
              className="form-control form-control-lg text-center shadow-sm"
              value={iniciales}
              onChange={handleIniciales}
              maxLength={modelo?.max || 4}
              style={{
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: "bold",
                width: 150,
                margin: "0 auto",
              }}
              placeholder="ABCÑ"
            />

            {/* Tamaño */}
            <div className="mt-4">
              <label className="form-label fw-semibold">Tamaño</label>
              <select
                className="form-select shadow-sm"
                value={tamanoLetra}
                onChange={(e) => {
                  setTamanoLetra(e.target.value);
                  setColorLetra("");
                }}
              >
                {tamanos.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Colores */}
            <div className="mt-4">
              <label className="form-label fw-semibold">Color de letra</label>
              <div className="d-flex gap-3 mt-2 flex-wrap">
                {coloresDisponibles.map((c) => {
                  let bg =
                    c === "oro"
                      ? "linear-gradient(135deg, #FFD700, #FFC107)"
                      : c === "plata"
                      ? "linear-gradient(135deg, #C0C0C0, #E0E0E0)"
                      : "black";
                  const seleccionado = colorLetra === c;
                  return (
                    <div
                      key={c}
                      className={`rounded-circle d-flex align-items-center justify-content-center shadow-sm color-selector ${
                        seleccionado ? "selected" : ""
                      }`}
                      style={{
                        width: 40,
                        height: 40,
                        background: bg,
                        cursor: "pointer",
                        border: seleccionado
                          ? "3px solid #333"
                          : "1px solid #ccc",
                        transition: "transform 0.2s ease",
                      }}
                      onClick={() => setColorLetra(c)}
                    >
                      {seleccionado && (
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {!letrasValidas && (
              <div className="alert alert-warning mt-4 shadow-sm">
                ⚠️ Letras no disponibles en stock, se hacen sobre pedido.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
