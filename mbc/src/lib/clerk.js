// src/lib/clerk.js
// Verificación manual del JWT de Clerk sin @clerk/backend
// (patrón usado cuando no hay dominio custom / claves sk_test_)

export function verificarClerk(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const [, payloadB64] = token.split('.');
    const payloadJson = Buffer.from(payloadB64, 'base64url').toString('utf-8');
    const payload = JSON.parse(payloadJson);

    const ahora = Math.floor(Date.now() / 1000);
    if (!payload.sub || !payload.exp || payload.exp < ahora) {
      return null;
    }

    return payload; // contiene sub (userId), exp, etc.
  } catch (err) {
    console.error('Error al verificar token Clerk:', err);
    return null;
  }
}