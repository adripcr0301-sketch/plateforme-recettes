const { Favori, Recette, Categorie } = require('../models');

/**
 * Get all favourites for the authenticated user.
 * GET /api/favoris
 */
const getFavoris = async (req, res) => {
  try {
    const favoris = await Favori.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Recette, include: [{ model: Categorie, attributes: ['nom'] }] }],
    });
    return res.json(favoris);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

/**
 * Add a recipe to favourites.
 * POST /api/favoris/:recetteId
 */
const addFavori = async (req, res) => {
  try {
    const { recetteId } = req.params;
    const existing = await Favori.findOne({ where: { user_id: req.user.id, recette_id: recetteId } });
    if (existing) return res.status(409).json({ message: 'Déjà en favori.' });

    await Favori.create({ user_id: req.user.id, recette_id: recetteId });
    return res.status(201).json({ message: 'Ajouté aux favoris.' });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

/**
 * Remove a recipe from favourites.
 * DELETE /api/favoris/:recetteId
 */
const removeFavori = async (req, res) => {
  try {
    const deleted = await Favori.destroy({
      where: { user_id: req.user.id, recette_id: req.params.recetteId },
    });
    if (!deleted) return res.status(404).json({ message: 'Favori introuvable.' });
    return res.json({ message: 'Retiré des favoris.' });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

module.exports = { getFavoris, addFavori, removeFavori };
