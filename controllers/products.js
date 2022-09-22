const { response } = require("express");
const { Product } = require('../models/');

const getProducts = async(req, res = response) => {
    const { limit = 5, since = 0 } = req.query;

    const [total, products] = await Promise.all([
        Product.countDocuments({status: true}),
        Product.find({ status: true})
        .populate('user', 'nombre')
        .populate('category', 'nombre')
        .skip(parseInt(since))    //todo
        .limit(parseInt(limit))
    ])
    res.json({
        total,
        products
    });
}

// Obtener Categoria - populate
const getProduct = async(req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById( id ).populate('user', 'nombre');
    res.json(product)
}


const createProduct = async(req, res = response) => {

    const {status, user, ...body} = req.body;
    const productDB = await Product.findOne({name: body.name});
    if(productDB) {
        return res.status(400).json({
            msg: `El producto ${productDB.name}, ya existe`
        });
    }
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.usuario._id,
    }
    const product = new Product( data )
    await product.save();
    res.status(201).json(product);
}

const putProduct = async(req, res = response) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;
    if(data.name){
        data.name = data.name.toUpperCase();
    }
    data.user = req.usuario._id;
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    res.json(product);
}

const deleteProduct = async(req, res = response) => {
    const { id } = req.params;
    const productDelete = await Product.findByIdAndUpdate( id, { status: false}, {new: true})
    res.json(productDelete)
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    putProduct,
    deleteProduct
}