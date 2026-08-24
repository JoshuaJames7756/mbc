// src/lib/db.js
import { neon } from '@neondatabase/serverless';

// DATABASE_URL vive en .env.local (y en las Environment Variables de Vercel al deployar)
// Este archivo SOLO debe importarse desde /api, nunca desde componentes del frontend
export const sql = neon(process.env.DATABASE_URL);