import { useNavigate } from "react-router-dom";

export default function ModelCard({ id, name, img, precio }) {
  const navigate = useNavigate();

  return (
    <div className="col-6 col-md-6 col-lg-4">
      <button
        className="card h-100 shadow p-0 border-0 bg-transparent"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/modelo/${id}`)}
      >
        <img
          src={img}
          alt={name}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <div className="mt-auto">
            <span className="fw-bold text-success fs-5">${precio}</span>
          </div>
        </div>
      </button>
    </div>
  );
}
