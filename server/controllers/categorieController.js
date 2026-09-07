const { Categorie } = require('../models');

/**
 * Get all categories.
 * GET /api/categories
 */
const getAll = async (req, res) => {
  try {
    const categories = await Categorie.findAll({ order: [['nom', 'ASC']] });
    return res.json(categories);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

/**
 * Create a category (admin only).
 * POST /api/categories
 */
const create = async (req, res) => {
  try {
    const { nom, slug } = req.body;
    const categorie = await Categorie.create({ nom, slug });
    return res.status(201).json(categorie);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

/**
 * Update a category (admin only).
 * PUT /api/categories/:id
 */
const update = async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) return res.status(404).json({ message: 'Catégorie introuvable.' });
    await categorie.update(req.body);
    return res.json(categorie);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

/**
 * Delete a category (admin only).
 * DELETE /api/categories/:id
 */
const remove = async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) return res.status(404).json({ message: 'Catégorie introuvable.' });
    await categorie.destroy();
    return res.json({ message: 'Catégorie supprimée.' });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

module.exports = { getAll, create, update, remove };
