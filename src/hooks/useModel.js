import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useModel(id) {
  const [modelo, setModelo] = useState(null);

  useEffect(() => {
    if (!id) return;
    async function fetchModelo() {
      const { data, error } = await supabase
        .from("modelos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching modelo:", error.message);
        return;
      }
      setModelo(data);
    }
    fetchModelo();
  }, [id]);

  return modelo;
}
