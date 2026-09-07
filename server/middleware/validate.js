const { body, validationResult } = require('express-validator');

/**
 * Run validation results and return 400 if any errors found.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/** Validation rules for POST /auth/register */
const registerRules = [
  body('prenom').trim().notEmpty().withMessage('Le prénom est requis.'),
  body('email').isEmail().withMessage('Email invalide.'),
  body('mot_de_passe')
    .isLength({ min: 8 })
    .withMessage('Le mot de passe doit contenir au moins 8 caractères.'),
];

/** Validation rules for POST /auth/login */
const loginRules = [
  body('email').isEmail().withMessage('Email invalide.'),
  body('mot_de_passe').notEmpty().withMessage('Le mot de passe est requis.'),
];

/** Validation rules for POST/PUT /recettes */
const recetteRules = [
  body('titre').trim().notEmpty().withMessage('Le titre est requis.'),
  body('description').trim().notEmpty().withMessage('La description est requise.'),
  body('temps_preparation').isInt({ min: 1 }).withMessage('Le temps de préparation est invalide.'),
  body('difficulte').isIn(['facile', 'moyen', 'difficile']).withMessage('Difficulté invalide.'),
  body('categorie_id').isInt({ min: 1 }).withMessage('La catégorie est requise.'),
];

module.exports = { validate, registerRules, loginRules, recetteRules };
