// api/productos/[id].js
import { neon } from '@neondatabase/serverless';
import { verificarClerk } from '../../src/lib/clerk.js';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const [producto] = await sql`SELECT * FROM productos WHERE id = ${id}`;
      if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
      return res.status(200).json(producto);
    } catch (err) {
      console.error('Error al obtener producto:', err);
      return res.status(500).json({ error: 'Error al obtener producto' });
    }
  }

  if (req.method === 'PUT') {
    const usuario = verificarClerk(req);
    if (!usuario) return res.status(401).json({ error: 'No autorizado' });

    try {
      const {
        nombre, categoria, descripcion, ingredientes,
        precio, imagen_url, imagen_public_id, destacado, activo, orden
      } = req.body;

      const [actualizado] = await sql`
        UPDATE productos SET
          nombre = ${nombre},
          categoria = ${categoria},
          descripcion = ${descripcion || null},
          ingredientes = ${ingredientes || []},
          precio = ${precio || null},
          imagen_url = ${imagen_url || null},
          imagen_public_id = ${imagen_public_id || null},
          destacado = ${destacado || false},
          activo = ${activo !== undefined ? activo : true},
          orden = ${orden || 0}
        WHERE id = ${id}
        RETURNING *
      `;

      if (!actualizado) return res.status(404).json({ error: 'Producto no encontrado' });
      return res.status(200).json(actualizado);
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      return res.status(500).json({ error: 'Error al actualizar producto' });
    }
  }

  if (req.method === 'DELETE') {
    const usuario = verificarClerk(req);
    if (!usuario) return res.status(401).json({ error: 'No autorizado' });

    try {
      const [eliminado] = await sql`DELETE FROM productos WHERE id = ${id} RETURNING id`;
      if (!eliminado) return res.status(404).json({ error: 'Producto no encontrado' });
      return res.status(200).json({ ok: true, id: eliminado.id });
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      return res.status(500).json({ error: 'Error al eliminar producto' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}