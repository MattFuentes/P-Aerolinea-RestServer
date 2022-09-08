const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
    
    if ( !req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token'
        });
    }
    const { role, nombre } = req.usuario;
    if ( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        })
    }
    
    next()
}

const checkRole = ( ...role ) => {
    return (req, res = response, next) => {
        console.log(role)
        if ( !role.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${role}`
            });
        }
        next();
    }
}
module.exports = {
    isAdminRole,
    checkRole
}