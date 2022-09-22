const checkRole = require('../middlewares/validate-role');
const validateJWT  = require('../middlewares/validate-jwt');
const validateModules = require('../middlewares/validate-modules');

module.exports = {
    ...checkRole,
    ...validateJWT,
    ...validateModules
}