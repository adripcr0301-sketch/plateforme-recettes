const { DataTypes } = require('sequelize');

/**
 * Recette model — a recipe published by a user.
 * @param {import('sequelize').Sequelize} sequelize
 */
module.exports = (sequelize) => sequelize.define('Recette', {
  id:                 { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  titre:              { type: DataTypes.STRING(255), allowNull: false },
  description:        { type: DataTypes.TEXT, allowNull: false },
  temps_preparation:  { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  difficulte:         { type: DataTypes.ENUM('facile', 'moyen', 'difficile'), defaultValue: 'facile' },
  image_url:          { type: DataTypes.STRING(500), allowNull: true },
}, {
  tableName:  'recette',
  timestamps: true,
  createdAt:  'created_at',
  updatedAt:  false,
});
