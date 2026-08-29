import { Phone } from 'lucide-react';

const WHATSAPP_NUMERO = '59167421429';

export default function WhatsAppFloat() {
  const mensaje = encodeURIComponent('¡Hola! Me gustaría hacer un pedido o realizar una consulta.');
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`;

  return (
    <a
      href={url}
      className="btn-whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <Phone size={28} strokeWidth={2} />
    </a>
  );
}