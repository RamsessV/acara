import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useColors(modeloId) {
  const [colores, setColores] = useState([]);
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (!modeloId) return;
    async function fetchColores() {
      const { data, error } = await supabase
        .from("colores")
        .select("*")
        .eq("modelo", modeloId);

      if (error) {
        console.error("Error fetching colores:", error.message);
        return;
      }

      if (data && data.length) {
        setColores(data);
        setColor(data[0]);
      }
    }
    fetchColores();
  }, [modeloId]);

  return { colores, color, setColor };
}
