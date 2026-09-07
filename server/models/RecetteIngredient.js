const { DataTypes } = require('sequelize');

/**
 * RecetteIngredient model — pivot table linking recipes to ingredients with quantity.
 * @param {import('sequelize').Sequelize} sequelize
 */
module.exports = (sequelize) => sequelize.define('RecetteIngredient', {
  recette_id:    { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
  ingredient_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
  quantite:      { type: DataTypes.STRING(50), allowNull: false },
}, {
  tableName:  'recette_ingredient',
  timestamps: false,
});
