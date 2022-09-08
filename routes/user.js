
const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateModules, checkRole, isAdminRole } = require('../middlewares')

const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');

const { isRoleValidate, isEmailValidate, isUserPerIDValidate } = require('../helpers/db-validator');

const router = Router();

router.get('/', userGet);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isUserPerIDValidate),
    check('role').custom(isRoleValidate),
    validateModules
], userPut);

router.post('/',[
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(isEmailValidate),
    check('password', 'La contraseña es obligatoria y debe de ser de mas de 6 letras').isLength({min: 6}),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
/*     check('role', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']), */
    check('role').custom(isRoleValidate),
    validateModules
], userPost);
router.delete('/:id',[
    validateJWT,
/*     isAdminRole, */
    checkRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isUserPerIDValidate),
    validateModules
], userDelete);
router.patch('/', userPatch);


module.exports = router