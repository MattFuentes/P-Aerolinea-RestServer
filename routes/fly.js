const { Router } = require('express');
const { flyGet, flyPost } = require('../controllers/fly');
const { validatePostFly } = require('../middlewares/validate-routes');

const router = Router();

// GET Vuelos - ALL
router.get('/', flyGet);

// POST Crear VUELO
router.post('/', validatePostFly, flyPost);

module.exports = router