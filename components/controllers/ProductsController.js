const ProductService = require('../services/ProductsService');

class ProductController {

    // [GET] /products
    index = async(req, res) => {
        const products = await ProductService.index(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);
        res.render('products', { products });
    }

    // [GET] /products/:slug
    show(req, res) {
        res.render('product-detail');
    }
}

module.exports = new ProductController;