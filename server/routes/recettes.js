const express    = require('express');
const { getAll, getOne, create, update, remove } = require('../controllers/recetteController');
const { verifyToken } = require('../middleware/auth');
const { validate, recetteRules } = require('../middleware/validate');

const router = express.Router();

router.get('/',    getAll);
router.get('/:id', getOne);
router.post('/',   verifyToken, recetteRules, validate, create);
router.put('/:id', verifyToken, recetteRules, validate, update);
router.delete('/:id', verifyToken, remove);

module.exports = router;
