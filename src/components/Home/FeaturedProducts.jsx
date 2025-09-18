import ProductCard from "./ProductCard";
import icon from '../../assets/featured.jpeg'

export default function FeaturedProducts() {
  return (
    <section className="py-5 bg-secondary-custom">
      <div className="container">
        <h3 className="fw-bold text-center mb-4">Productos Destacados</h3>
        <div className="d-flex d-lg-grid overflow-auto gap-3" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div className="flex-shrink-0" style={{ minWidth: "80%", maxWidth: "320px" }}>
            <ProductCard icon={icon} title="The Everyday Tote" description="Perfect for daily use with a spacious design." price="79.99" />
          </div>
          <div className="flex-shrink-0" style={{ minWidth: "80%", maxWidth: "320px" }}>
            <ProductCard icon={icon} title="The Weekend Bag" description="Stylish and functional for short trips." price="89.99" />
          </div>
          <div className="flex-shrink-0" style={{ minWidth: "80%", maxWidth: "320px" }}>
            <ProductCard icon={icon} title="The Travel Backpack" description="Comfortable and spacious for all your travel needs." price="99.99" />
          </div>
          <div className="flex-shrink-0" style={{ minWidth: "80%", maxWidth: "320px" }}>
            <ProductCard icon={icon} title="The Work Briefcase" description="Sleek and professional for the office." price="109.99" />
          </div>
        </div>
      </div>
    </section>
  );
}
