const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/user');

const userGet = async(req = request, res = response) => {
    const { limit = 5, since = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({status: true}),
        Usuario.find({ status: true})
        .skip(Number(since))    
        .limit(Number(limit))
    ])
    res.json({
        total,
        usuarios
    });
}

const userPost = async(req, res = response) => {
    const { nombre, email, password, role } = req.body;
    const usuario = new Usuario({ nombre, email, password, role});
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt)
    await usuario.save();
    res.json({usuario});
}

const userPut = async(req, res = response) => {
    const {id} = req.params;
    const { _id, password, google, email, ...resto } = req.body;
    // TODO VALIDAR CONTRA BASE DE DATOS
    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }
    const userDB = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'Put api - Controller',
        userDB
    });
}

const userDelete = async(req, res = response) => {
    
    const { id } = req.params

    const user = await Usuario.findByIdAndUpdate(id, { status: false})

    res.json({
        user
    });
}

const userPatch = (req, res = response) => {
    
    res.json({
        msg: 'Patch api - Controller'
    });
}


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}