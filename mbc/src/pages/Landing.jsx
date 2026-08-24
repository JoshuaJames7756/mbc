// src/pages/Landing.jsx
import Hero from '../components/Hero';
import Beneficios from '../components/Beneficios';
import Catalogo from '../components/Catalogo';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div>
      <Hero />
      <Beneficios />
      <Catalogo />
      <Footer />
    </div>
  );
}