const express = require('express');
const { getFavoris, addFavori, removeFavori } = require('../controllers/favoriController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.get('/',              verifyToken, getFavoris);
router.post('/:recetteId',   verifyToken, addFavori);
router.delete('/:recetteId', verifyToken, removeFavori);

module.exports = router;
