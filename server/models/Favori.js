const { DataTypes } = require('sequelize');

/**
 * Favori model — pivot table linking users to their favourite recipes.
 * @param {import('sequelize').Sequelize} sequelize
 */
module.exports = (sequelize) => sequelize.define('Favori', {
  user_id:    { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
  recette_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
}, {
  tableName:  'favori',
  timestamps: true,
  createdAt:  'created_at',
  updatedAt:  false,
});
