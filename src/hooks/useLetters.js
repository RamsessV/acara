import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useLetters() {
  const [letrasData, setLetrasData] = useState([]);
  const [tamanos, setTamanos] = useState([]);

  useEffect(() => {
    async function fetchLetras() {
      const { data, error } = await supabase.from("letras").select("*");

      if (error) {
        console.error("Error fetching letras:", error.message);
        return;
      }

      if (data) {
        setLetrasData(data);
        setTamanos([...new Set(data.map((l) => l.size))]);
      }
    }
    fetchLetras();
  }, []);

  return { letrasData, tamanos };
}
