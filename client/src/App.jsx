import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Accueil from './pages/Accueil';
import ListeRecettes from './pages/ListeRecettes';
import FicheRecette from './pages/FicheRecette';
import Login from './pages/Login';
import Register from './pages/Register';
import Favoris from './pages/Favoris';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/"              element={<Accueil />} />
            <Route path="/recettes"      element={<ListeRecettes />} />
            <Route path="/recettes/:id"  element={<FicheRecette />} />
            <Route path="/login"         element={<Login />} />
            <Route path="/register"      element={<Register />} />
            <Route path="/favoris"       element={<Favoris />} />
            <Route path="/admin"         element={<Admin />} />
            <Route path="*"             element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
