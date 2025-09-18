import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";

export function useNewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, precio, img")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) {
        console.error("Error fetching new products:", error);
        setError(error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchNewProducts();
  }, []);

  return { products, loading, error };
}

// ...otros hooks...
export function useSearchAndCategory(searchTerm, categoryId) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase.from("products").select("id, name, precio, img");
      if (searchTerm) {
        query = query.ilike("name", `%${searchTerm}%`);
      }
      if (categoryId) {
        query = query.eq("category_id", categoryId);
      }
      const { data, error } = await query;
      if (error) setError(error);
      else setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [searchTerm, categoryId]);

  return { products, loading, error };
}