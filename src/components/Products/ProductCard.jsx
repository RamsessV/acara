export default function ProductCard({ product }) { 
    return (
        <div key={product.id} className="col-6 col-md-4 col-lg-3">
						<div className="card h-100 text-center bg-accent">
							<div className="p-3">
								<img
									src={product.img}
									alt={product.name}
									className="img-fluid rounded"
									style={{ height: "150px", objectFit: "cover" }}
								/>
							</div>
							<div className="card-body d-flex flex-column">
								<h5 className="card-title fs-6 fw-bold">{product.name}</h5>
								<p className="card-text text-muted small mb-2 fw-bold">${product.precio}</p>
								<button className="btn w-75 mx-auto bg-main fw-bold">Ver</button>
							</div>
						</div>
					</div>
    );
}