const { Router } = require('express');
const { searcher } = require('../controllers/search');

const router = Router();

// GET Buscador
router.get('/:colection/:term', searcher)

module.exports = router