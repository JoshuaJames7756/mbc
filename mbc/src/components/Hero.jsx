// src/components/Hero.jsx
import logo from '../assets/img/logo-mbc-dorado.png';
import styles from './Hero.module.css';

const WHATSAPP_NUMERO = '59167421429'; // ajusta si el principal es el 76438793

export default function Hero() {
  const mensaje = encodeURIComponent('Hola, quisiera más información sobre los productos MBC');
  const linkWhatsapp = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`;

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.contenido}`}>
        <img src={logo} alt="MBC" className={styles.logo} />
        <p className={styles.tagline}>Belleza que empieza en ti</p>
        <h1 className={styles.titulo}>
          Cuidado que se ve, <span>cabello que enamora</span>
        </h1>
        <p className={styles.subtitulo}>
          Shampoos, acondicionadores y jabones orgánicos, hechos con extractos naturales y vitamina E.
        </p>
        <div className={styles.acciones}>
          <a href={linkWhatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            Hacer pedido por WhatsApp
          </a>
          <a href="#catalogo" className={styles.linkSecundario}>Ver productos ↓</a>
        </div>
      </div>
    </section>
  );
}