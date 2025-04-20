import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Bibliotheque from './component/Bibliotheque/Bibliotheque';
import Cours from './component/Cours/Cours';
import Corpus from './component/Corpus/Corpus';

function Layout() {
  return (
    <div className="grid-container">
      {/* Sidebar */}
      <aside className="aside1">
        <nav className="menue">
          <Link to="/" className="false">Accueil</Link>
          <Link to="/bibliotheque" className="false">Bibliothèque</Link>
          <Link to="/cours" className="false">Cours</Link>
          <Link to="/corpus" className="false">Corpus</Link>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur la Plateforme TAL</h1>
      <p className="text-muted-foreground">
        Sélectionnez une section dans le menu latéral pour commencer
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="bibliotheque" element={<Bibliotheque />} />
        <Route path="cours" element={<Cours />} />
        <Route path="corpus" element={<Corpus />} />
      </Route>
    </Routes>
  );
}