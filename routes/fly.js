
const { Router } = require('express');
const { check } = require('express-validator');
const { flyGet, flyPost } = require('../controllers/fly');

const { isRoleValidate, isEmailValidate, isUserPerIDValidate } = require('../helpers/db-validator');
const { validateModules } = require('../middlewares/validate-modules');

const router = Router();

router.get('/', flyGet);

router.post('/',[
    check('from', 'El ORIGEN es obligatorio').not().isEmpty(),
    check('to', 'El DESTINO es obligatorio').not().isEmpty(),
    check('duration', 'La DURACION es obligatorio').not().isEmpty(),
    check('passengers', 'Los PASAJEROS son obligatorios').not().isEmpty(),
    validateModules
], flyPost);


module.exports = router