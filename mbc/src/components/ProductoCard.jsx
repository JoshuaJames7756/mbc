// src/components/ProductoCard.jsx
import styles from './ProductoCard.module.css';

const WHATSAPP_NUMERO = '59167421429'; // ajusta al número principal del cliente

export default function ProductoCard({ producto }) {
  const mensaje = encodeURIComponent(
    `Hola, me interesa el producto: ${producto.nombre}`
  );
  const linkWhatsapp = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`;

  return (
    <div className={styles.card}>
      <div className={styles.imagenWrap}>
        {producto.imagen_url ? (
          <img src={producto.imagen_url} alt={producto.nombre} />
        ) : (
          <div className={styles.sinImagen}>MBC</div>
        )}
      </div>
      <div className={styles.contenido}>
        <span className={styles.categoria}>{producto.categoria}</span>
        <h3>{producto.nombre}</h3>
        {producto.descripcion && <p className={styles.descripcion}>{producto.descripcion}</p>}
        {producto.ingredientes?.length > 0 && (
          <ul className={styles.ingredientes}>
            {producto.ingredientes.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
        )}
        {producto.precio && <p className={styles.precio}>Bs {producto.precio}</p>}
        <a href={linkWhatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  );
}