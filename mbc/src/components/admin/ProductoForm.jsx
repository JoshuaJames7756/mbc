import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { subirImagenCloudinary } from '../../lib/cloudinary';
import styles from './ProductoForm.module.css';

const CATEGORIAS = ['shampoo', 'acondicionador', 'jabon'];

export default function ProductoForm({ producto, onGuardado, onCancelar }) {
  const { getToken } = useAuth();
  const esNuevo = !producto?.id;

  const [form, setForm] = useState({
    nombre: producto?.nombre || '',
    categoria: producto?.categoria || 'shampoo',
    descripcion: producto?.descripcion || '',
    ingredientes: producto?.ingredientes?.join(', ') || '',
    precio: producto?.precio || '',
    imagen_url: producto?.imagen_url || '',
    imagen_public_id: producto?.imagen_public_id || '',
    destacado: producto?.destacado || false,
    activo: producto?.activo ?? true,
    orden: producto?.orden || 0,
  });
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  function actualizar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  async function manejarImagen(e) {
    const archivo = e.target.files[0];
    if (!archivo) return;

    setSubiendoImagen(true);
    setError(null);
    try {
      const { url, public_id } = await subirImagenCloudinary(archivo, getToken);
      actualizar('imagen_url', url);
      actualizar('imagen_public_id', public_id);
    } catch (err) {
      console.error('Error al subir imagen:', err);
      setError(`No se pudo subir la imagen: ${err.message}`);
    } finally {
      setSubiendoImagen(false);
    }
  }

  async function manejarSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError(null);

    const payload = {
      ...form,
      precio: form.precio ? Number(form.precio) : null,
      ingredientes: form.ingredientes
        ? form.ingredientes.split(',').map((i) => i.trim()).filter(Boolean)
        : [],
    };

    try {
      const token = await getToken();
      const url = esNuevo ? '/api/productos' : `/api/productos/${producto.id}`;
      const res = await fetch(url, {
        method: esNuevo ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Error al guardar');
      onGuardado();
    } catch (err) {
      setError('No se pudo guardar el producto. Inténtalo nuevamente.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={manejarSubmit}>
      <h2>{esNuevo ? 'Nuevo producto' : 'Editar producto'}</h2>

      <label>
        Nombre del Producto
        <input
          type="text"
          value={form.nombre}
          onChange={(e) => actualizar('nombre', e.target.value)}
          placeholder="Ej. Shampoo Orgánico de Romero"
          required
        />
      </label>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <label>
          Categoría
          <select value={form.categoria} onChange={(e) => actualizar('categoria', e.target.value)}>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Precio (Bs)
          <input
            type="number"
            step="0.01"
            value={form.precio}
            onChange={(e) => actualizar('precio', e.target.value)}
            placeholder="0.00"
          />
        </label>
      </div>

      <label>
        Descripción
        <textarea
          value={form.descripcion}
          onChange={(e) => actualizar('descripcion', e.target.value)}
          rows={3}
          placeholder="Escribe los beneficios o características principales..."
        />
      </label>

      <label>
        Ingredientes (separados por coma)
        <input
          type="text"
          value={form.ingredientes}
          onChange={(e) => actualizar('ingredientes', e.target.value)}
          placeholder="Romero, Jengibre, Clavo de olor, Canela"
        />
      </label>

      <label>
        Imagen del Producto
        <input type="file" accept="image/*" onChange={manejarImagen} />
        {subiendoImagen && <span className={styles.subiendo}>Subiendo imagen a la nube...</span>}
        {form.imagen_url && (
          <img src={form.imagen_url} alt="Vista previa del producto" className={styles.preview} />
        )}
      </label>

      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={form.destacado}
            onChange={(e) => actualizar('destacado', e.target.checked)}
          />
          Destacado
        </label>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={form.activo}
            onChange={(e) => actualizar('activo', e.target.checked)}
          />
          Activo (visible en la tienda)
        </label>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.acciones}>
        <button type="button" onClick={onCancelar} className={styles.btnCancelar}>
          Cancelar
        </button>
        <button type="submit" disabled={guardando || subiendoImagen} className={styles.btnGuardar}>
          {guardando ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </div>
    </form>
  );
}