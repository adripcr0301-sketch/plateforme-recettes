import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function ListeRecettes() {
  const [recettes, setRecettes]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtre, setFiltre]         = useState('');
  const [recherche, setRecherche]   = useState('');
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/api/recettes'),
      api.get('/api/categories'),
    ]).then(([r, c]) => {
      setRecettes(r.data);
      setCategories(c.data);
    }).catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const affichees = recettes.filter(r => {
    const matchCat = filtre ? r.categorie_id === Number(filtre) : true;
    const matchNom = r.titre.toLowerCase().includes(recherche.toLowerCase());
    return matchCat && matchNom;
  });

  return (
    <div className="container py-5">
      <h1 className="mb-4">Toutes les recettes</h1>

      {/* Filtres */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <label htmlFor="recherche" className="visually-hidden">Rechercher</label>
          <input
            id="recherche"
            type="search"
            className="form-control"
            placeholder="Rechercher une recette…"
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="categorie" className="visually-hidden">Filtrer par catégorie</label>
          <select
            id="categorie"
            className="form-select"
            value={filtre}
            onChange={e => setFiltre(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.nom}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center" role="status">
          <div className="spinner-border text-secondary" />
        </div>
      ) : affichees.length === 0 ? (
        <p className="text-muted">Aucune recette trouvée.</p>
      ) : (
        <div className="row g-4">
          {affichees.map(r => (
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
                  <h2 className="card-title h5">{r.titre}</h2>
                  <p className="card-text text-muted small">{r.description?.slice(0, 80)}…</p>
                  <span className="badge bg-secondary me-2">{r.Categorie?.nom}</span>
                  <span className="badge bg-light text-dark">{r.difficulte}</span>
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
    </div>
  );
}
