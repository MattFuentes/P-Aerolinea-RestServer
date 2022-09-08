const validateJWT  = require('../middlewares/validate-jwt');
const validateModules = require('../middlewares/validate-modules');
const checkRole = require('../middlewares/validate-role');

module.exports = {
    ...validateModules,
    ...validateJWT,
    ...checkRole
}