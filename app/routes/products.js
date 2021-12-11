const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductsController');

//router.get('/', productController.pagi);

router.post('/filter', productController.filter);

// // router.post('/search', productController.search);
// router.get('/search', productController.search);

router.get('/:productid', productController.show);

// router.get('/', productController.index);
router.get('/', productController.list);

module.exports = router;
