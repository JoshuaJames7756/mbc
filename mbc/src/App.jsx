// src/App.jsx
import Landing from './pages/Landing';
import Admin from './pages/Admin';

function App() {
  const esAdmin = window.location.pathname.startsWith('/admin');
  return esAdmin ? <Admin /> : <Landing />;
}

export default App