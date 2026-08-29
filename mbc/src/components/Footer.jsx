import { Phone, Truck } from 'lucide-react';
import styles from './Footer.module.css';

const NUMEROS = ['67421429', '76438793'];

export default function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.contenido}`}>
        <div className={styles.bloque}>
          <h3>Haz tu pedido</h3>
          <p className={styles.metodo}>Atención personalizada por WhatsApp</p>
          <div className={styles.numeros}>
            {NUMEROS.map((num) => (
              <a
                key={num}
                href={`https://wa.me/591${num}?text=${encodeURIComponent('Hola, me gustaría consultar sobre los productos MBC')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.numero}
              >
                <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
                <span>+591 {num}</span>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bloque}>
          <div className={styles.entregas}>
            <Truck size={22} strokeWidth={1.75} aria-hidden="true" />
            <span>Envíos y entregas disponibles</span>
          </div>
        </div>
      </div>

      <div className={styles.marca}>
        <p>MBC</p>
        <p className={styles.slogan}>Nutrición y cuidado para tu cabello • {anioActual}</p>
      </div>
    </footer>
  );
}