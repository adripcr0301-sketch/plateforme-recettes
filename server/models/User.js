const { DataTypes } = require('sequelize');

/**
 * User model — represents a registered user.
 * @param {import('sequelize').Sequelize} sequelize
 */
module.exports = (sequelize) => sequelize.define('User', {
  id:           { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  prenom:       { type: DataTypes.STRING(100), allowNull: false },
  email:        { type: DataTypes.STRING(255), allowNull: false, unique: true },
  mot_de_passe: { type: DataTypes.STRING(255), allowNull: false },
  role:         { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
}, {
  tableName:  'user',
  timestamps: true,
  createdAt:  'created_at',
  updatedAt:  false,
});
