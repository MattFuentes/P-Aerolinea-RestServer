const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user')

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('k-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const usuario = await Usuario.findById(uid);
        
        if(!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - User doesn\'t exist '
            })
        }

        // Verificar UID TRUE
        if (!usuario.status) {
            return res.status(401).json({
                msg: 'Token no valido - User status false'
            })
        }
        req.usuario = usuario

        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validateJWT
}