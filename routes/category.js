const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCategories, getCategory, putCategory, deleteCategory } = require('../controllers/category');
const { isCategoryPerId } = require('../helpers/db-validator');
const { isAdminRole } = require('../middlewares');
const { validateJWT } = require('../middlewares/validate-jwt');

const { validateModules } = require('../middlewares/validate-modules');

const router = Router();


// Obtener categorias - publico
router.get('/', getCategories);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID de MONGO Valido').isMongoId(),
    check('id').custom(isCategoryPerId),
    validateModules,
], getCategory);

// Crear categoria - Privado - cualquier persona con token
router.post('/', [ 
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateModules
], createCategory);

// Actualizar registro
router.put('/:id',[
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(isCategoryPerId),
    validateModules,
], putCategory);

// Borrar categoria - ADMIN
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID de MONGO Valido').isMongoId(),
    check('id').custom(isCategoryPerId),
    validateModules,
], deleteCategory);


module.exports = router;