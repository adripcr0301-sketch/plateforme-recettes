const express = require('express');
const { getAll, create, update, remove } = require('../controllers/categorieController');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/',       getAll);
router.post('/',      verifyToken, isAdmin, create);
router.put('/:id',    verifyToken, isAdmin, update);
router.delete('/:id', verifyToken, isAdmin, remove);

module.exports = router;
