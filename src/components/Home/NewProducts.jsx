import ProductCard from './ProductCard';
import { useNewProducts } from '../../hooks/useProducts';
import Loading from '../Loading';

export default function NewProducts() {
    const { products, loading, error } = useNewProducts();

    if (loading) return <Loading />;
    if (error) return <div>Error loading products</div>;

    return (
        <div className="bg-secondary-custom py-5 text-center">
            <div className="container">
                <h3 className="fw-bold">Nuevos Productos</h3>
                <div className="row g-4">
                    {products.map((product) => (
                        <div className="col-12 col-md-6 col-lg-3" key={product.id}>
                            <ProductCard icon={product.img} title={product.name}  price={product.precio} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}