const { Router } = require('express');
const { createProduct, getProduct, getProducts, putProduct, deleteProduct } = require('../controllers/products');
const { validateGetProduct, validatePostProduct, validatePutProduct, validateDeleteProduct } = require('../middlewares/validate-routes');

const router = Router();

// GET Producto TOTAL
router.get('/', getProducts);

// GET Producto by ID
router.get('/:id', validateGetProduct , getProduct); 

// POST Creación del PRODUCTO
router.post('/', validatePostProduct, createProduct);

// PUT Actualización del PRODUCTO
router.put('/:id', validatePutProduct, putProduct);

// DELETE Eliminar producto
router.delete('/:id', validateDeleteProduct, deleteProduct);


module.exports = router;