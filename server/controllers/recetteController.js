const { Recette, Categorie, User, Ingredient } = require('../models');
const redisClient = require('../services/redis');

/**
 * Get all recipes, with optional category filter.
 * GET /api/recettes
 */
const getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.categorie_id) where.categorie_id = req.query.categorie_id;

    const cached = await redisClient.get('recettes_populaires');
    if (cached && !req.query.categorie_id) {
      return res.json(JSON.parse(cached));
    }

    const recettes = await Recette.findAll({
      where,
      include: [
        { model: Categorie, attributes: ['nom', 'slug'] },
        { model: User,      attributes: ['prenom'] },
      ],
      order: [['created_at', 'DESC']],
    });

    if (!req.query.categorie_id) {
      await redisClient.setEx('recettes_populaires', 300, JSON.stringify(recettes));
    }

    return res.json(recettes);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

/**
 * Get a single recipe by id with ingredients.
 * GET /api/recettes/:id
 */
const getOne = async (req, res) => {
  try {
    const recette = await Recette.findByPk(req.params.id, {
      include: [
        { model: Categorie,  attributes: ['nom', 'slug'] },
        { model: User,       attributes: ['prenom'] },
        { model: Ingredient, through: { attributes: ['quantite'] } },
      ],
    });
    if (!recette) return res.status(404).json({ message: 'Recette introuvable.' });
    return res.json(recette);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

/**
 * Create a new recipe (authenticated users only).
 * POST /api/recettes
 */
const create = async (req, res) => {
  try {
    const { titre, description, temps_preparation, difficulte, image_url, categorie_id } = req.body;
    const recette = await Recette.create({
      titre, description, temps_preparation, difficulte, image_url,
      categorie_id, user_id: req.user.id,
    });
    await redisClient.del('recettes_populaires');
    return res.status(201).json(recette);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

/**
 * Update a recipe (admin or owner only).
 * PUT /api/recettes/:id
 */
const update = async (req, res) => {
  try {
    const recette = await Recette.findByPk(req.params.id);
    if (!recette) return res.status(404).json({ message: 'Recette introuvable.' });

    if (req.user.role !== 'admin' && recette.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Action non autorisée.' });
    }

    await recette.update(req.body);
    await redisClient.del('recettes_populaires');
    return res.json(recette);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

/**
 * Delete a recipe (admin or owner only).
 * DELETE /api/recettes/:id
 */
const remove = async (req, res) => {
  try {
    const recette = await Recette.findByPk(req.params.id);
    if (!recette) return res.status(404).json({ message: 'Recette introuvable.' });

    if (req.user.role !== 'admin' && recette.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Action non autorisée.' });
    }

    await recette.destroy();
    await redisClient.del('recettes_populaires');
    return res.json({ message: 'Recette supprimée.' });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };
