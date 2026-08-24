// api/productos/index.js
import { neon } from '@neondatabase/serverless';
import { verificarClerk } from '../../src/lib/clerk.js';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const productos = await sql`
        SELECT id, nombre, categoria, descripcion, ingredientes, precio,
               imagen_url, destacado, orden
        FROM productos
        WHERE activo = true
        ORDER BY orden ASC, creado_en DESC
      `;
      return res.status(200).json(productos);
    } catch (err) {
      console.error('Error al listar productos:', err);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
  }

  if (req.method === 'POST') {
    const usuario = verificarClerk(req);
    if (!usuario) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    try {
      const {
        nombre, categoria, descripcion, ingredientes,
        precio, imagen_url, imagen_public_id, destacado, orden
      } = req.body;

      if (!nombre || !categoria) {
        return res.status(400).json({ error: 'nombre y categoria son requeridos' });
      }

      const [nuevo] = await sql`
        INSERT INTO productos
          (nombre, categoria, descripcion, ingredientes, precio, imagen_url, imagen_public_id, destacado, orden)
        VALUES
          (${nombre}, ${categoria}, ${descripcion || null}, ${ingredientes || []},
           ${precio || null}, ${imagen_url || null}, ${imagen_public_id || null},
           ${destacado || false}, ${orden || 0})
        RETURNING *
      `;
      return res.status(201).json(nuevo);
    } catch (err) {
      console.error('Error al crear producto:', err);
      return res.status(500).json({ error: 'Error al crear producto' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}