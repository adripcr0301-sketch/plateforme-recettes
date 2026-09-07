import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm]   = useState({ prenom: '', email: '', mot_de_passe: '' });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    try {
      const res = await api.post('/api/auth/register', form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors) {
        setErrors(data.errors.map(e => e.msg));
      } else {
        setErrors([data?.message || 'Erreur lors de l\'inscription.']);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h3 mb-4 text-center">Inscription</h1>
              {errors.length > 0 && (
                <ul className="alert alert-danger mb-3" role="alert">
                  {errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="prenom" className="form-label">Prénom</label>
                  <input
                    id="prenom"
                    type="text"
                    name="prenom"
                    className="form-control"
                    value={form.prenom}
                    onChange={handleChange}
                    required
                    autoComplete="given-name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mot_de_passe" className="form-label">
                    Mot de passe <small className="text-muted">(8 caractères min.)</small>
                  </label>
                  <input
                    id="mot_de_passe"
                    type="password"
                    name="mot_de_passe"
                    className="form-control"
                    value={form.mot_de_passe}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    minLength={8}
                  />
                </div>
                <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                  {loading ? 'Inscription…' : 'Créer mon compte'}
                </button>
              </form>
              <p className="text-center mt-3 mb-0 small">
                Déjà un compte ? <Link to="/login">Se connecter</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
