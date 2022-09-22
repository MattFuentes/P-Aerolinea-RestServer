const { Router } = require('express');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');
const { validatePutUser, validatePostUser, validateDeleteUSer } = require('../middlewares/validate-routes');

const router = Router();

// GET Usuarios - ALL
router.get('/', userGet);

// PUT Actualizar datos usuario
router.put('/:id', validatePutUser, userPut);

// POST Crear usuario
router.post('/', validatePostUser, userPost);

// DELETE Eliminar usuario
router.delete('/:id', validateDeleteUSer, userDelete);

// PATCH Test
router.patch('/', userPatch);


module.exports = router