const { response } = require("express");
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");

const login = async(req, res = response) => {

    const { email, password } = req.body;
    try {
        // Verificar email
        const usuario = await Usuario.findOne({ email })
        if ( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no es correcta'
            })
        }
        // Verificar Usuario activo en DB
        
        if ( !usuario.status ){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no es correcta. estado = false'
            })
        }
        // Verificar contraseña
        
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no es correcta. password'
            })
        }

        // Generar TOKEN

        const token = await generateJWT(usuario.id);
        res.json({
            token,
            usuario
        })
    
    } catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}