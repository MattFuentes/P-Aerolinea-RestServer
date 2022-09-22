const { check } = require('express-validator');
const { isProductPerId, isCategoryPerId } = require('../helpers/db-validator');
const { validateModules } = require('../middlewares/validate-modules');
const { isAdminRole } = require('../middlewares');
const { validateJWT } = require('../middlewares/validate-jwt');

exports.validateGetProduct = [
    check('id', 'No es un ID de MONGO Valido').isMongoId(),
    check('id').custom(isProductPerId),
    validateModules,
]