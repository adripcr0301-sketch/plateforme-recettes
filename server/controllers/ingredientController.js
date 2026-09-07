const { Ingredient } = require('../models');

/**
 * Get all ingredients.
 * GET /api/ingredients
 */
const getAll = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll({ order: [['nom', 'ASC']] });
    return res.json(ingredients);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

/**
 * Create an ingredient (admin only).
 * POST /api/ingredients
 */
const create = async (req, res) => {
  try {
    const { nom, unite } = req.body;
    const ingredient = await Ingredient.create({ nom, unite });
    return res.status(201).json(ingredient);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

/**
 * Delete an ingredient (admin only).
 * DELETE /api/ingredients/:id
 */
const remove = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.id);
    if (!ingredient) return res.status(404).json({ message: 'Ingrédient introuvable.' });
    await ingredient.destroy();
    return res.json({ message: 'Ingrédient supprimé.' });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

module.exports = { getAll, create, remove };
