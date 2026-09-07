const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Register a new user.
 * POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { prenom, email, mot_de_passe } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email déjà utilisé.' });
    }

    const hash = await bcrypt.hash(mot_de_passe, 10);
    const user = await User.create({ prenom, email, mot_de_passe: hash });

    return res.status(201).json({ message: 'Compte créé.', userId: user.id });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

/**
 * Log in an existing user and return a JWT.
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    const valid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!valid) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.json({ token, role: user.role, prenom: user.prenom });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

module.exports = { register, login };
