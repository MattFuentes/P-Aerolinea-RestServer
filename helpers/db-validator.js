const { Category, Product } = require('../models');
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

const isCategoryPerId = async(id) => {
    const existCategory = await Category.findById(id);
    if(!existCategory) {
        throw new Error(`El id ${ id } no existe.`)
    }
}
const isProductPerId = async(id) => {
    const existProduct = await Product.findById(id);
    if(!existProduct) {
        throw new Error(`El id ${ id } no existe.`)
    }
}
module.exports = {
    isRoleValidate,
    isEmailValidate,
    isUserPerIDValidate,
    isCategoryPerId,
    isProductPerId
}