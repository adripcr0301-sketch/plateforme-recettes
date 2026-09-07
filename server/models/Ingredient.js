const { DataTypes } = require('sequelize');

/**
 * Ingredient model — a cooking ingredient with its unit.
 * @param {import('sequelize').Sequelize} sequelize
 */
module.exports = (sequelize) => sequelize.define('Ingredient', {
  id:    { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  nom:   { type: DataTypes.STRING(150), allowNull: false },
  unite: { type: DataTypes.STRING(50),  allowNull: false },
}, {
  tableName:  'ingredient',
  timestamps: false,
});
