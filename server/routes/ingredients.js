const express = require('express');
const { getAll, create, remove } = require('../controllers/ingredientController');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/',       getAll);
router.post('/',      verifyToken, isAdmin, create);
router.delete('/:id', verifyToken, isAdmin, remove);

module.exports = router;
