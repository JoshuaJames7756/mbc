import Landing from './pages/Landing';
import Admin from './pages/Admin';

export default function App() {
  const esAdmin = window.location.pathname.startsWith('/admin');
  return esAdmin ? <Admin /> : <Landing />;
}