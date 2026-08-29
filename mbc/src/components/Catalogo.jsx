import { useProductos } from '../hooks/useProductos';
import ProductoCard from './ProductoCard';
import styles from './Catalogo.module.css';

export default function Catalogo() {
  const { productos, cargando, error } = useProductos();

  return (
    <section id="catalogo" className={styles.catalogo}>
      <div className="container">
        <h2 className={styles.titulo}>Nuestra Colección</h2>

        {cargando && (
          <div className={styles.estado}>
            <p>Cargando productos exclusivos...</p>
          </div>
        )}

        {error && (
          <div className={styles.estado}>
            <p>No se pudo cargar el catálogo en este momento.</p>
          </div>
        )}

        {!cargando && !error && productos.length === 0 && (
          <div className={styles.estado}>
            <p>Próximamente nuevos productos disponibles.</p>
          </div>
        )}

        {!cargando && !error && productos.length > 0 && (
          <div className={styles.grid}>
            {productos.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}