import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const DIFFICULTE_BADGE = {
  facile:    'success',
  moyen:     'warning',
  difficile: 'danger',
};

export default function FicheRecette() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recette, setRecette]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [favori, setFavori]     = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    api.get(`/api/recettes/${id}`)
      .then(res => setRecette(res.data))
      .catch(() => navigate('/404'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!user) return;
    api.get('/api/favoris')
      .then(res => setFavori(res.data.some(f => f.recette_id === Number(id))))
      .catch(() => {});
  }, [user, id]);

  async function toggleFavori() {
    if (!user) { navigate('/login'); return; }
    setFavLoading(true);
    try {
      if (favori) {
        await api.delete(`/api/favoris/${id}`);
        setFavori(false);
      } else {
        await api.post(`/api/favoris/${id}`);
        setFavori(true);
      }
    } catch {
      // erreur silencieuse
    } finally {
      setFavLoading(false);
    }
  }

  if (loading) return (
    <div className="container py-5 text-center" role="status">
      <div className="spinner-border text-secondary" />
    </div>
  );

  if (!recette) return null;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          {recette.image_url && (
            <img
              src={recette.image_url}
              alt={recette.titre}
              className="img-fluid rounded mb-4 w-100"
              style={{ maxHeight: '380px', objectFit: 'cover' }}
            />
          )}

          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
            <h1 className="mb-0">{recette.titre}</h1>
            <button
              className={`btn ${favori ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={toggleFavori}
              disabled={favLoading}
              aria-label={favori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              {favori ? '★ Favori' : '☆ Ajouter aux favoris'}
            </button>
          </div>

          <div className="mb-3 d-flex gap-2 flex-wrap">
            <span className="badge bg-secondary">{recette.Categorie?.nom}</span>
            <span className={`badge bg-${DIFFICULTE_BADGE[recette.difficulte] || 'secondary'}`}>
              {recette.difficulte}
            </span>
            <span className="badge bg-light text-dark">⏱ {recette.temps_preparation} min</span>
            {recette.User && (
              <span className="badge bg-light text-dark">Par {recette.User.prenom}</span>
            )}
          </div>

          <p className="lead">{recette.description}</p>
        </div>

        {/* Ingrédients */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card shadow-sm">
            <div className="card-header" style={{ backgroundColor: '#2B3C4E', color: '#fff' }}>
              <h2 className="h5 mb-0">Ingrédients</h2>
            </div>
            <ul className="list-group list-group-flush">
              {recette.Ingredients?.map(ing => (
                <li key={ing.id} className="list-group-item d-flex justify-content-between">
                  <span>{ing.nom}</span>
                  <span className="text-muted">{ing.RecetteIngredient?.quantite}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
