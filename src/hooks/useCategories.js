import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from("categorias")
        .select("id, name, img");

      if (error) {
        console.error("Error fetching categories:", error.message);
        return;
      }

      if (data) setCategories(data);
    }
    fetchCategories();
  }, []);

  return categories;
}
