const Role = require('../models/role');
const Usuario = require('../models/user');
const isRoleValidate = async(role = '') => {
    const existRole = await Role.findOne({role});
    if( !existRole ){
        throw new Error(`El rol ${ role } no esta registrado en la DB`)
    }
}

const isEmailValidate = async(email = '') => {
    const existEmail = await Usuario.findOne({ email });
    if(existEmail) {
        throw new Error(`El mail ${ email } ya existe.`)
    }
}

const isUserPerIDValidate = async(id) => {
    const existId = await Usuario.findById(id);
    if(!existId) {
        throw new Error(`El id ${ id } no existe.`)
    }
}

module.exports = {
    isRoleValidate,
    isEmailValidate,
    isUserPerIDValidate
}