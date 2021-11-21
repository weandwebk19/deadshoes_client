const express = require('express');
const router = express.Router();

const Products = require('../models/products');

const productController = require('../components/controllers/ProductsController');

// // productController.show
router.get('/:slug', productController.show);

// productController.index
router.get('/', productController.index);

// router.get('/', (req, res) =>
//     Products.findAll()
//         .then(products => res.render('products', { products }))
//         .catch(err => console.log(err)));

module.exports = router;
