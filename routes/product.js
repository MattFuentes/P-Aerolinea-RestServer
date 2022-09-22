const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getProduct, getProducts, putProduct, deleteProduct } = require('../controllers/products');
const { isProductPerId, isCategoryPerId } = require('../helpers/db-validator');
const { isAdminRole } = require('../middlewares');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateGetProduct } = require('./validate')

const { validateModules } = require('../middlewares/validate-modules');

const router = Router();


// Obtener categorias - publico
 router.get('/', getProducts);

// Obtener una categoria por id - publico
router.get('/:id', validateGetProduct , getProduct); 

// Crear categoria - Privado - cualquier persona con token
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'La categoria es obligatorio, no es un ID MONGO').isMongoId(),
    check('category').custom( isCategoryPerId ),
    validateModules
], createProduct);

// Actualizar registro
router.put('/:id',[
    validateJWT,
    check('id', 'El id no es valido').custom(isProductPerId),
    validateModules,
], putProduct);

// Borrar categoria - ADMIN
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID de MONGO Valido').isMongoId(),
    check('id').custom(isProductPerId),
    validateModules,
], deleteProduct);


module.exports = router;