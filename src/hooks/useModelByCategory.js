import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useModelsByCategory(categoriaId) {
  const [modelos, setModelos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoriaId) return;

    async function fetchModelos() {
      setLoading(true);
      const { data, error } = await supabase
        .from("modelos")
        .select("*")
        .eq("categoria", categoriaId);

      if (error) {
        console.error("Error fetching modelos:", error.message);
      } else if (data) {
        setModelos(data);
      }
      setLoading(false);
    }

    fetchModelos();
  }, [categoriaId]);

  return { modelos, loading };
}
