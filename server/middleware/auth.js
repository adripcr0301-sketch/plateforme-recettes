const jwt = require('jsonwebtoken');

/**
 * Verify JWT token and attach decoded user to request.
 * Returns 401 if token is missing or invalid.
 */
const verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: 'Token manquant.' });

  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant.' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalide.' });
  }
};

/**
 * Allow access only to admin users.
 * Must be used after verifyToken.
 */
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès réservé aux administrateurs.' });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
