import { useNavigate } from "react-router-dom";

export default function CategoryCard({ id, name, img }) {
  const navigate = useNavigate();

  return (
    <div className="col-11 col-md-6 col-lg-4 justify-content-center mx-auto cat-card">
      <button
        className="w-100 p-0 border-0 bg-transparent"
        onClick={() => navigate(`/categoria/${id}`, { state: { cname: name } })}
      >
        <div
          className="rounded shadow d-flex align-items-end"
          style={{
            height: "220px",
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            className="w-100 text-white p-3 cat-card-name"
          >
            {name}
          </div>
        </div>
      </button>
    </div>
  );
}
