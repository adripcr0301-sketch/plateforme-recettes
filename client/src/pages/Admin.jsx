import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const EMPTY_FORM = { titre: '', description: '', temps_preparation: '', difficulte: 'facile', categorie_id: '', image_url: '' };

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recettes, setRecettes]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [editId, setEditId]         = useState(null);
  const [message, setMessage]       = useState('');
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'admin') { navigate('/'); return; }
    charger();
  }, [user]);

  async function charger() {
    try {
      const [r, c] = await Promise.all([api.get('/api/recettes'), api.get('/api/categories')]);
      setRecettes(r.data);
      setCategories(c.data);
    } catch {
      // erreur silencieuse
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/api/recettes/${editId}`, form);
        setMessage('Recette mise à jour.');
      } else {
        await api.post('/api/recettes', form);
        setMessage('Recette créée.');
      }
      setForm(EMPTY_FORM);
      setEditId(null);
      charger();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur.');
    }
  }

  function editer(r) {
    setEditId(r.id);
    setForm({
      titre: r.titre,
      description: r.description,
      temps_preparation: r.temps_preparation,
      difficulte: r.difficulte,
      categorie_id: r.categorie_id,
      image_url: r.image_url || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function supprimer(id) {
    if (!window.confirm('Supprimer cette recette ?')) return;
    try {
      await api.delete(`/api/recettes/${id}`);
      setRecettes(r => r.filter(x => x.id !== id));
      setMessage('Recette supprimée.');
    } catch {
      setMessage('Erreur lors de la suppression.');
    }
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Administration</h1>

      {message && (
        <div className="alert alert-info alert-dismissible" role="alert">
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage('')} aria-label="Fermer" />
        </div>
      )}

      {/* Formulaire création / édition */}
      <div className="card shadow-sm mb-5">
        <div className="card-header" style={{ backgroundColor: '#2B3C4E', color: '#fff' }}>
          <h2 className="h5 mb-0">{editId ? 'Modifier la recette' : 'Nouvelle recette'}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="titre">Titre</label>
                <input id="titre" name="titre" className="form-control" value={form.titre} onChange={handleChange} required />
              </div>
              <div className="col-12 col-md-3">
                <label className="form-label" htmlFor="temps_preparation">Temps (min)</label>
                <input id="temps_preparation" name="temps_preparation" type="number" min="1" className="form-control" value={form.temps_preparation} onChange={handleChange} required />
              </div>
              <div className="col-12 col-md-3">
                <label className="form-label" htmlFor="difficulte">Difficulté</label>
                <select id="difficulte" name="difficulte" className="form-select" value={form.difficulte} onChange={handleChange}>
                  <option value="facile">Facile</option>
                  <option value="moyen">Moyen</option>
                  <option value="difficile">Difficile</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="categorie_id">Catégorie</label>
                <select id="categorie_id" name="categorie_id" className="form-select" value={form.categorie_id} onChange={handleChange} required>
                  <option value="">-- Choisir --</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="image_url">URL image</label>
                <input id="image_url" name="image_url" type="url" className="form-control" value={form.image_url} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea id="description" name="description" className="form-control" rows="3" value={form.description} onChange={handleChange} required />
              </div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-primary">{editId ? 'Mettre à jour' : 'Créer'}</button>
              {editId && (
                <button type="button" className="btn btn-secondary" onClick={() => { setForm(EMPTY_FORM); setEditId(null); }}>
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Liste des recettes */}
      <h2 className="h4 mb-3">Toutes les recettes ({recettes.length})</h2>
      {loading ? (
        <div className="text-center" role="status"><div className="spinner-border text-secondary" /></div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Difficulté</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recettes.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.titre}</td>
                  <td>{r.Categorie?.nom}</td>
                  <td><span className="badge bg-secondary">{r.difficulte}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editer(r)}>Modifier</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => supprimer(r.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
