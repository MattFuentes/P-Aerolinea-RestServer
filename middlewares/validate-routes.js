const { check } = require('express-validator');
const { isProductPerId, isCategoryPerId } = require('../helpers/db-validator');
const { validateModules } = require('./validate-modules');
const { isAdminRole } = require('.');
const { validateJWT } = require('./validate-jwt');

// Validación de PRODUCTO
// --_--_--_--_--_--_--_--_

exports.validateGetProduct = [
    check('id', 'No es un ID de MONGO Valido').isMongoId(),
    check('id').custom(isProductPerId),
    validateModules,
];

exports.validatePostProduct = [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'La categoria es obligatorio, no es un ID MONGO').isMongoId(),
    check('category').custom( isCategoryPerId ),
    validateModules
];

exports.validatePutProduct = [
    validateJWT,
    check('id', 'El id no es valido').custom(isProductPerId),
    validateModules
];

exports.validateDeleteProduct = [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID de MONGO Valido').isMongoId(),
    check('id').custom(isProductPerId),
    validateModules
];

// Validación de CATEGORIA
// --_--_--_--_--_--_--_--_

exports.validateGetCategory = [
    check('id', 'No es un ID de MONGO Valido').isMongoId(),
    check('id').custom(isCategoryPerId),
    validateModules
];

exports.validatePostCategory = [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateModules
];

exports.validatePutCategory = [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(isCategoryPerId),
    validateModules
];

exports.validateDeleteCategory = [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID de MONGO Valido').isMongoId(),
    check('id').custom(isCategoryPerId),
    validateModules,
];

// Validación de USUARIOS
// --_--_--_--_--_--_--_--_

exports.validatePutUser = [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isUserPerIDValidate),
    check('role').custom(isRoleValidate),
    validateModules
];

exports.validatePostUser = [
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(isEmailValidate),
    check('password', 'La contraseña es obligatoria y debe de ser de mas de 6 letras').isLength({min: 6}),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('role').custom(isRoleValidate),
    validateModules
];

exports.validateDeleteUSer = [
    validateJWT,
    checkRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isUserPerIDValidate),
    validateModules
];

// Validación de VUELOS
// --_--_--_--_--_--_--_--_

exports.validatePostFly = [
    check('from', 'El ORIGEN es obligatorio').not().isEmpty(),
    check('to', 'El DESTINO es obligatorio').not().isEmpty(),
    check('duration', 'La DURACION es obligatorio').not().isEmpty(),
    check('passengers', 'Los PASAJEROS son obligatorios').not().isEmpty(),
    validateModules
]

// Validación de VUELOS
// --_--_--_--_--_--_--_--_

exports.validatePostAuth = [ // Login WEB
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validateModules
]

exports.validatePostAuthGoogle = [ // Login with Google Account
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validateModules
]