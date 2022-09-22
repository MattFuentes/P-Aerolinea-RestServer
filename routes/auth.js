const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { validatePostAuth, validatePostAuthGoogle } = require('../middlewares/validate-routes');

const router = Router();

// Post LOGIN WEB
router.post('/login', validatePostAuth, login);

// Post LOGIN with GOOGLE ACCOUNT
router.post('/google', validatePostAuthGoogle, googleSignIn)

module.exports = router;