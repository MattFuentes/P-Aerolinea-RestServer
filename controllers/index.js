const auth = require('../controllers/auth');
const category  = require('../controllers/category');
const fly  = require('../controllers/fly');
const products  = require('../controllers/products');
const search  = require('../controllers/search');
const user  = require('../controllers/user');

module.exports = {
    ...auth,
    ...category,
    ...fly,
    ...products,
    ...search,
    ...user
}