// src/lib/cloudinary.js

// Necesita el token de Clerk para pedir la firma; lo recibe como argumento
// desde el componente que ya tiene acceso a useAuth()
export async function subirImagenCloudinary(archivo, getToken) {
  const token = await getToken();

  const resFirma = await fetch('/api/cloudinary/sign', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resFirma.ok) throw new Error('No se pudo firmar la subida');
  const { firma, timestamp, folder, apiKey, cloudName } = await resFirma.json();

  const formData = new FormData();
  formData.append('file', archivo);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', firma);
  formData.append('folder', folder);

  const resSubida = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!resSubida.ok) throw new Error('Error al subir a Cloudinary');
  const data = await resSubida.json();

  return { url: data.secure_url, public_id: data.public_id };
}