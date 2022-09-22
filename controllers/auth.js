const { response, json } = require("express");
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;
    try {
        const { nombre, email} = await googleVerify(id_token); 
        
        let usuario = await Usuario.findOne({ email });
        if ( !usuario ) {
            const data = {
                nombre,
                email,
                password: 'a',
                role: 'USER_ROLE',
                google: true
            };
            usuario = new Usuario( data )
            await usuario.save();
        }

        if ( !usuario.status ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado.'
            });
        }

        const token = await generateJWT( usuario.id );

        res.json({
            usuario,
            token
        }); 
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}