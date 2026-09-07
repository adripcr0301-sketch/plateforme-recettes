import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Accueil() {
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/recettes')
      .then(res => setRecettes(res.data.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        className="py-5 text-white text-center"
        style={{ backgroundColor: '#2B3C4E', minHeight: '320px', display: 'flex', alignItems: 'center' }}
        aria-label="Section hero"
      >
        <div className="container">
          <h1 className="display-5 fw-bold mb-3">Découvrez & partagez des recettes</h1>
          <p className="lead mb-4">Des recettes simples, gourmandes, pour tous les niveaux.</p>
          <Link to="/recettes" className="btn btn-secondary btn-lg">
            Voir toutes les recettes
          </Link>
        </div>
      </section>

      {/* Recettes populaires */}
      <section className="container py-5">
        <h2 className="mb-4">Recettes populaires</h2>
        {loading ? (
          <div className="text-center" role="status" aria-label="Chargement">
            <div className="spinner-border text-secondary" />
          </div>
        ) : (
          <div className="row g-4">
            {recettes.map(r => (
              <div className="col-12 col-sm-6 col-lg-4" key={r.id}>
                <article className="card h-100 shadow-sm">
                  {r.image_url && (
                    <img
                      src={r.image_url}
                      className="card-img-top"
                      alt={r.titre}
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <h3 className="card-title h5">{r.titre}</h3>
                    <p className="card-text text-muted small">{r.description?.slice(0, 80)}…</p>
                    <span className="badge bg-secondary me-2">{r.Categorie?.nom}</span>
                    <span className="badge bg-light text-dark">{r.temps_preparation} min</span>
                  </div>
                  <div className="card-footer bg-white border-0">
                    <Link to={`/recettes/${r.id}`} className="btn btn-outline-primary btn-sm w-100">
                      Voir la recette
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
