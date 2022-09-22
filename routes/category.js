const { Router } = require('express');
const { createCategory, getCategories, getCategory, putCategory, deleteCategory } = require('../controllers/category');
const { validatePostCategory, validateGetCategory, validatePutCategory, validateDeleteCategory } = require('../middlewares/validate-routes');

const router = Router();

// GET Categorias - ALL
router.get('/', getCategories);

// GET Categoria by ID
router.get('/:id', validateGetCategory, getCategory);

// POST Crear categoria
router.post('/', validatePostCategory, createCategory);

// PUT Actualizar categoria
router.put('/:id', validatePutCategory, putCategory);

// DELETE Borrar categoria
router.delete('/:id', validateDeleteCategory, deleteCategory);

module.exports = router;