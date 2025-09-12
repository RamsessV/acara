import { useNavigate } from "react-router-dom";

export default function CategoryCard({ id, name, img }) {
  const navigate = useNavigate();

  return (
    <div className="col-12 col-md-6 col-lg-4">
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
            className="w-100 text-white p-3"
            style={{
              background: "rgba(0,0,0,0.5)",
              fontWeight: "bold",
              fontSize: "1.3rem",
              letterSpacing: "1px",
              textShadow: "0 2px 8px #000",
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          >
            {name}
          </div>
        </div>
      </button>
    </div>
  );
}
