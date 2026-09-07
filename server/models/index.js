const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host:    process.env.DB_HOST || 'localhost',
    port:    process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

const User              = require('./User')(sequelize);
const Categorie         = require('./Categorie')(sequelize);
const Recette           = require('./Recette')(sequelize);
const Ingredient        = require('./Ingredient')(sequelize);
const RecetteIngredient = require('./RecetteIngredient')(sequelize);
const Favori            = require('./Favori')(sequelize);

// Associations
User.hasMany(Recette, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Recette.belongsTo(User, { foreignKey: 'user_id' });

Categorie.hasMany(Recette, { foreignKey: 'categorie_id' });
Recette.belongsTo(Categorie, { foreignKey: 'categorie_id' });

Recette.belongsToMany(Ingredient, { through: RecetteIngredient, foreignKey: 'recette_id' });
Ingredient.belongsToMany(Recette,  { through: RecetteIngredient, foreignKey: 'ingredient_id' });

User.belongsToMany(Recette, { through: Favori, foreignKey: 'user_id' });
Recette.belongsToMany(User,  { through: Favori, foreignKey: 'recette_id' });

module.exports = { sequelize, User, Categorie, Recette, Ingredient, RecetteIngredient, Favori };
