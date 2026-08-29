import styles from './ProductoCard.module.css';

const WHATSAPP_NUMERO = '59167421429';

export default function ProductoCard({ producto }) {
  const { nombre, categoria, descripcion, ingredientes, precio, imagen_url } = producto;

  const detallePrecio = precio ? ` (Bs ${precio})` : '';
  const mensaje = encodeURIComponent(
    `¡Hola! Me interesa pedir el producto: *${nombre}*${detallePrecio}. ¿Tienen disponibilidad?`
  );
  const linkWhatsapp = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`;

  return (
    <article className={styles.card}>
      <div className={styles.imagenWrap}>
        {imagen_url ? (
          <img 
            src={imagen_url} 
            alt={nombre} 
            loading="lazy"
          />
        ) : (
          <div className={styles.sinImagen}>
            <span>{nombre?.charAt(0) || 'M'}</span>
          </div>
        )}
      </div>

      <div className={styles.contenido}>
        {categoria && <span className={styles.categoria}>{categoria}</span>}
        <h3>{nombre}</h3>
        {descripcion && <p className={styles.descripcion}>{descripcion}</p>}

        {ingredientes?.length > 0 && (
          <ul className={styles.ingredientes}>
            {ingredientes.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
        )}

        {precio && <p className={styles.precio}>Bs {Number(precio).toFixed(2)}</p>}

        <a 
          href={linkWhatsapp} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-whatsapp"
          style={{ marginTop: 'auto', width: '100%' }}
        >
          Pedir por WhatsApp
        </a>
      </div>
    </article>
  );
}