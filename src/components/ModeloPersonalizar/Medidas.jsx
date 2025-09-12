export function Medidas({ modelo }) {
  return (
    <div className="mb-4 text-center d-flex align-items-center gap-2">
      <div>
        <strong>Alto:</strong> {modelo.alto} cm
      </div>
      <div>
        <strong>Ancho:</strong> {modelo.ancho} cm
      </div>
      <div>
        <strong>Largo:</strong> {modelo.largo} cm
      </div>
    </div>
  );
}
