import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#2B3C4E' }}>
      <div className="container">
        <Link className="navbar-brand" to="/">🍳 Plateforme Recettes</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Ouvrir le menu"
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }} />
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/recettes">Recettes</NavLink>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/favoris">Mes favoris</NavLink>
                </li>
                {user.role === 'admin' && (
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/admin">Admin</NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/login">Connexion</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="btn btn-secondary btn-sm" to="/register">Inscription</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
