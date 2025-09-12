import { useNavigate } from "react-router-dom";

export default function ModelCard({ id, name, img, precio }) {
  const navigate = useNavigate();

  return (
    <div className="col-6 col-md-6 col-lg-4 mb-4">
      <div
        className="model-card"
        onClick={() => navigate(`/modelo/${id}`)}
      >
        <div className="model-card-img">
          <img src={img} alt={name} />
        </div>
        <div className="model-card-body">
          <h5 className="model-card-title">{name}</h5>
          <span className="model-card-price">${precio}</span>
        </div>
      </div>
    </div>
  );
}
