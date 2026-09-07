require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const recetteRoutes   = require('./routes/recettes');
const categorieRoutes = require('./routes/categories');
const ingredientRoutes= require('./routes/ingredients');
const authRoutes      = require('./routes/auth');
const favoriRoutes    = require('./routes/favoris');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth',        authRoutes);
app.use('/api/recettes',    recetteRoutes);
app.use('/api/categories',  categorieRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/favoris',     favoriRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API Plateforme Recettes — OK' });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;
