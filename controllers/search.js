const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Category, Product, Flys } = require('../models')

const colectionEnable = [
    'usuarios',
    'categorias',
    'productos',
    'role',
    'vuelos',
];

const searchUser = async( term = '', res = response) => {
    const isMongoID = ObjectId.isValid( term );
    if(isMongoID){
        const user = await Usuario.findById(term);
        return res.json({
            results: ( user ) ? [ user ] : []
        })
    }

    const regex = new RegExp( term, 'i');

    const users = await Usuario.find({
        $or: [{nombre: regex }, { email: regex}],
        $and: [{status: true}]
    });

    res.json({
        results: users
    })
}

const searchCategory = async( term = '', res = response) => {
    const isMongoID = ObjectId.isValid( term );
    if(isMongoID){
        const category = await Category.findById(term);
        return res.json({
            results: ( category ) ? [ category ] : []
        })
    }

    const regex = new RegExp( term, 'i');

    const categorys = await Category.find({ name: regex, status: true});

    res.json({
        results: categorys
    })
}

const searchProduct = async( term = '', res = response) => {
    const isMongoID = ObjectId.isValid( term );
    if(isMongoID){
        const product = await Product.findById(term)
                        .populate('category', 'name');
        return res.json({
            results: ( product ) ? [ product ] : []
        })
    }

    const regex = new RegExp( term, 'i');

    const products = await Product.find({ name: regex, status: true});

    res.json({
        results: products
    })
}

const searchFly = async( term = '', res = response) => {
    const isMongoID = ObjectId.isValid( term );
    if(isMongoID){
        const fly = await Flys.findById(term);
        return res.json({
            results: ( fly ) ? [ fly ] : []
        })
    }

    const regex = new RegExp( term, 'i');

    const flys = await Flys.find({ from: regex, to: regex, status: true});

    res.json({
        results: flys
    })
}

const searcher = (req, res = response) => {

    const { colection, term } = req.params
    if (!colectionEnable.includes(colection)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${colectionEnable}`
        })
    }

    switch (colection) {
        case 'usuarios':
            searchUser(term, res)
            break;
        case 'categorias':
            searchCategory(term, res)
            break;
        case 'productos':
            searchProduct(term, res)
            break;
        case 'vuelos':
            searchFly(term, res)
            break;
        default:
            res.status(500).json({
                msg: 'Falta implementar opcion'
            })
            break;
    }
}

module.exports = {
    searcher
}