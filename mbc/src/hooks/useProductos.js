// src/hooks/useProductos.js
import { useState, useEffect } from 'react';

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const res = await fetch('/api/productos');
        if (!res.ok) throw new Error('No se pudieron cargar los productos');
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    cargarProductos();
  }, []);

  return { productos, cargando, error };
}