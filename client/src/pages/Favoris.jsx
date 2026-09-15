import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Favoris() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.get('/api/favoris')
      .then(res => setFavoris(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  async function retirerFavori(recetteId) {
    try {
      await api.delete(`/api/favoris/${recetteId}`);
      setFavoris(f => f.filter(r => r.recette_id !== recetteId));
    } catch {
      // erreur silencieuse
    }
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Mes favoris</h1>
      {loading ? (
        <div className="text-center" role="status">
          <div className="spinner-border text-secondary" />
        </div>
      ) : favoris.length === 0 ? (
        <div className="text-center text-muted py-5">
          <p>Vous n'avez pas encore de recettes favorites.</p>
          <Link to="/recettes" className="btn btn-secondary">Explorer les recettes</Link>
        </div>
      ) : (
        <div className="row g-4">
          {favoris.map(r => (
            <div className="col-12 col-sm-6 col-lg-4" key={r.recette_id}>
              <article className="card h-100 shadow-sm">
                {r.Recette?.image_url && (
                  <img
                    src={r.Recette.image_url}
                    className="card-img-top"
                    alt={r.Recette.titre}
                    style={{ height: '160px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h2 className="card-title h5">{r.Recette?.titre}</h2>
                  <span className="badge" style={{ backgroundColor: '#0099D8' }}>{r.Recette?.Categorie?.nom}</span>
                </div>
                <div className="card-footer d-flex gap-2 bg-white border-0">
                  <Link to={`/recettes/${r.recette_id}`} className="btn btn-outline-primary btn-sm flex-fill">
                    Voir
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => retirerFavori(r.recette_id)}
                    aria-label={`Retirer ${r.Recette?.titre} des favoris`}
                  >
                    ✕
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
