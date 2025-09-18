import ProductList from "../components/Products/ProductList";
import { useParams } from "react-router-dom";


export default function Products() {
  const { categoryId, searchTerm } = useParams();

  return (
    <ProductList categoryId={categoryId} searchTerm={searchTerm} />
  );
}
