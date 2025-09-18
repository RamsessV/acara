import { Link } from 'react-router-dom'

export default function ProductCard({icon, title, description = 'default description', price}) {
  return (
    <Link to="/" className="text-decoration-none">
      <div className="card border-0 text-center h-100 pt-4">
        <img src={icon} className="card-img-top" alt="Product" style={{ height: "auto", maxHeight: "300px", objectFit: "contain" }}/>
        <div className="card-body">
          <h6 className="fw-bold">{title}</h6>
          <p className="text-muted small">{description}</p>
          <p className="fw-bold">${price}</p>
        </div>
      </div>
    </Link>
  )
}
