import Hero from '../components/Hero';
import Beneficios from '../components/Beneficios';
import Catalogo from '../components/Catalogo';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';

export default function Landing() {
  return (
    <div>
      <Hero />
      <Beneficios />
      <Catalogo />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}