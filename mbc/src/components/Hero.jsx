// src/components/Hero.jsx
import logo from '../assets/img/logo-mbc-dorado.png';
import styles from './Hero.module.css';

const WHATSAPP_NUMERO = '59167421429';

export default function Hero() {
  const mensaje = encodeURIComponent('¡Hola! Quisiera más información sobre los productos artesanales MBC.');
  const linkWhatsapp = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`;

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.contenido}`}>
        {logo && (
          <img 
            src={logo} 
            alt="MBC Cosmetics Logo" 
            className={styles.logo}
          />
        )}
        <p className={styles.tagline}>Belleza que empieza en ti</p>
        
        <h1 className={styles.titulo}>
          Cuidado que se ve, <span>cabello que enamora</span>
        </h1>
        
        <p className={styles.subtitulo}>
          Shampoos, acondicionadores y jabones orgánicos enriquecidos con extractos naturales y vitamina E.
        </p>
        
        <div className={styles.acciones}>
          <a 
            href={linkWhatsapp} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.btnPrincipal}
          >
            Hacer pedido por WhatsApp
          </a>
          <a href="#catalogo" className={styles.linkSecundario}>
            Ver catálogo completo ↓
          </a>
        </div>

        {/* Badges de Confianza para llenar el Hero y dar elegancia */}
        <div className={styles.badges}>
          <span>✦ 100% Orgánico</span>
          <span>✦ Sin Parabenos</span>
          <span>✦ Elaboración Artesanal</span>
        </div>
      </div>
    </section>
  );
}