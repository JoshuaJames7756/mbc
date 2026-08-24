// src/components/Catalogo.jsx
import { useProductos } from '../hooks/useProductos';
import ProductoCard from './ProductoCard';
import styles from './Catalogo.module.css';

export default function Catalogo() {
  const { productos, cargando, error } = useProductos();

  if (cargando) return <p className={styles.estado}>Cargando productos...</p>;
  if (error) return <p className={styles.estado}>No se pudieron cargar los productos.</p>;
  if (productos.length === 0) return <p className={styles.estado}>Próximamente nuevos productos.</p>;

  return (
    <section id="catalogo" className={styles.catalogo}>
      <div className="container">
        <h2 className={styles.titulo}>Nuestros Productos</h2>
        <div className={styles.grid}>
          {productos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </section>
  );
}