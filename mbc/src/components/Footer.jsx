// src/components/Footer.jsx
import { Phone, Truck } from 'lucide-react';
import styles from './Footer.module.css';

const NUMEROS = ['67421429', '76438793'];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.contenido}`}>
        <div className={styles.bloque}>
          <h3>Haz tu pedido</h3>
          <p className={styles.metodo}>Por mensaje privado o WhatsApp</p>
          <div className={styles.numeros}>
            {NUMEROS.map((num) => (
              <a
                key={num}
                href={`https://wa.me/591${num}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.numero}
              >
                <Phone size={18} strokeWidth={1.75} />
                {num}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bloque}>
          <div className={styles.entregas}>
            <Truck size={22} strokeWidth={1.75} />
            <span>Entregas disponibles</span>
          </div>
        </div>
      </div>

      <div className={styles.marca}>
        <p>MBC</p>
        <p className={styles.slogan}>Nutrición y cuidado para tu cabello</p>
      </div>
    </footer>
  );
}