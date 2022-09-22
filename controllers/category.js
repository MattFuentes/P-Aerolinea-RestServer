const { response } = require("express");
const { Category } = require('../models/');

const getCategories = async(req, res = response) => {
    const { limit = 5, since = 0 } = req.query;

    const [total, categories] = await Promise.all([
        Category.countDocuments({status: true}),
        Category.find({ status: true})
        .populate('user', 'nombre')
        .skip(parseInt(since))    //todo
        .limit(parseInt(limit))
    ])
    res.json({
        total,
        categories
    });
}

// Obtener Categoria - populate
const getCategory = async(req, res = response) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'nombre');
    res.json(category)
}


const createCategory = async(req, res = response) => {

    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({name});
    if(categoryDB) {
        return res.status(400).json({
            msg: `La categoria ${categoryDB.name}, ya existe`
        });
    }
    const data = {
        name,
        user: req.usuario._id,
    }
    const category = new Category( data )
    await category.save();
    res.status(201).json(category);
}

// actualizar Categoria 
const putCategory = async(req, res = response) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.usuario._id;
    const categoria = await Category.findByIdAndUpdate(id, data, { new: true });
    res.json(categoria);
}

// Borrar Categoria - Status
const deleteCategory = async(req, res = response) => {
    const { id } = req.params;
    const categoryDelete = await Category.findByIdAndUpdate( id, { status: false}, {new: true})
    res.json(categoryDelete)
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    putCategory,
    deleteCategory
}