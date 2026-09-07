const { DataTypes } = require('sequelize');

/**
 * Categorie model — groups recipes by type.
 * @param {import('sequelize').Sequelize} sequelize
 */
module.exports = (sequelize) => sequelize.define('Categorie', {
  id:   { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  nom:  { type: DataTypes.STRING(100), allowNull: false },
  slug: { type: DataTypes.STRING(100), allowNull: false, unique: true },
}, {
  tableName:  'categorie',
  timestamps: false,
});
