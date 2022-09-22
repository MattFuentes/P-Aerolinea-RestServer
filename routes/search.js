const { Router } = require('express');
const { searcher } = require('../controllers/search');

const router = Router();

router.get('/:colection/:term', searcher)

module.exports = router