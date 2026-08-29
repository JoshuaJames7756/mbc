// api/cloudinary/sign.js
import crypto from 'crypto';
import { verificarClerk } from '../../src/lib/clerk.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const usuario = verificarClerk(req);
  if (!usuario) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = 'mbc/productos';

  const paramsAFirmar = `folder=${folder}&timestamp=${timestamp}`;

  const firma = crypto
    .createHash('sha1')
    .update(paramsAFirmar + process.env.CLOUDINARY_API_SECRET)
    .digest('hex');

  return res.status(200).json({
    firma,
    timestamp,
    folder,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  });
}