// src/components/Beneficios.jsx
import { Droplet, Sparkles, Flower2, Leaf, Users } from 'lucide-react';
import styles from './Beneficios.module.css';

const beneficios = [
  { icon: Droplet, texto: 'Hidratación profunda' },
  { icon: Sparkles, texto: 'Cabello más suave y brillante' },
  { icon: Flower2, texto: 'Aroma elegante y duradero' },
  { icon: Leaf, texto: 'Fórmula nutritiva y delicada' },
  { icon: Users, texto: 'Ideal para todo tipo de cabello' },
];

export default function Beneficios() {
  return (
    <section className={styles.beneficios}>
      <div className={`container ${styles.grid}`}>
        {beneficios.map(({ icon: Icon, texto }) => (
          <div key={texto} className={styles.item}>
            <div className={styles.iconoWrap}>
              <Icon size={26} strokeWidth={1.75} />
            </div>
            <p>{texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}