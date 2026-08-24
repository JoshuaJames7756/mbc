// src/components/admin/ProductoTable.jsx
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import ProductoForm from './ProductoForm';
import styles from './ProductoTable.module.css';

export default function ProductoTable() {
  const { getToken } = useAuth();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState(null); // null = cerrado, {} = nuevo, {...} = editar
  const [error, setError] = useState(null);

  const cargarProductos = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch('/api/productos');
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      setError('No se pudieron cargar los productos');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  async function eliminarProducto(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    try {
      const token = await getToken();
      const res = await fetch(`/api/productos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      cargarProductos();
    } catch {
      alert('No se pudo eliminar el producto');
    }
  }

  if (editando !== null) {
    return (
      <ProductoForm
        producto={editando.id ? editando : null}
        onGuardado={() => {
          setEditando(null);
          cargarProductos();
        }}
        onCancelar={() => setEditando(null)}
      />
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2>Productos</h2>
        <button className={styles.btnNuevo} onClick={() => setEditando({})}>
          + Nuevo producto
        </button>
      </div>

      {cargando && <p>Cargando...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!cargando && (
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{p.precio ? `Bs ${p.precio}` : '—'}</td>
                <td className={styles.acciones}>
                  <button onClick={() => setEditando(p)}>Editar</button>
                  <button className={styles.btnEliminar} onClick={() => eliminarProducto(p.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}