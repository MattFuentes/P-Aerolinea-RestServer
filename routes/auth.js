const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validateModules } = require('../middlewares/validate-modules');

const router = Router();

router.post('/login',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validateModules
], login);

router.post('/google',[
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validateModules
], googleSignIn)

module.exports = router;