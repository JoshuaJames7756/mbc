// src/components/Footer.jsx
import { Phone, Truck, ShieldCheck, MapPin, CreditCard } from 'lucide-react';
import styles from './Footer.module.css';

const NUMEROS = [
  { num: '67421429', label: 'Ventas y Pedidos' },
  { num: '76438793', label: 'Consultas' },
];

export default function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Columna 1: Marca y Propuesta */}
        <div className={styles.columna}>
          <h2 className={styles.brandTitle}>MBC</h2>
          <p className={styles.brandText}>
            Cosmética capilar artesanal y orgánica. Nutrición pura con extractos naturales y vitamina E para devolverle la vida a tu cabello.
          </p>
          <div className={styles.badgeUbicacion}>
            <MapPin size={16} />
            <span>Cochabamba, Bolivia</span>
          </div>
        </div>

        {/* Columna 2: Envíos y Métodos de Pago */}
        <div className={styles.columna}>
          <h3>Envíos y Pagos</h3>
          <ul className={styles.listaInfo}>
            <li>
              <Truck size={18} />
              <span>Envíos locales y a toda la ciudad</span>
            </li>
            <li>
              <CreditCard size={18} />
              <span>Pagos por QR y Transferencia</span>
            </li>
            <li>
              <ShieldCheck size={18} />
              <span>Productos 100% Garantizados</span>
            </li>
          </ul>
        </div>

        {/* Columna 3: Atención y WhatsApp */}
        <div className={styles.columna}>
          <h3>Haz tu pedido</h3>
          <p className={styles.subtexto}>Atención personalizada inmediata:</p>
          <div className={styles.numeros}>
            {NUMEROS.map(({ num, label }) => (
              <a
                key={num}
                href={`https://wa.me/591${num}?text=${encodeURIComponent('Hola MBC, me gustaría realizar una consulta')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkWhatsapp}
              >
                <Phone size={16} />
                <div>
                  <strong>+591 {num}</strong>
                  <small>{label}</small>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContent}`}>
          <p>© {anioActual} MBC Cosmética Natural. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}