const ProductService = require('../services/ProductsService');

class ProductController {

    // [GET] /products
    index = async(req, res) => {
        const products = await ProductService.index();
        res.render('products', { products });
    }

    // [GET] /products/:slug
    show(req, res) {
        res.render('product-detail');
    }
}

module.exports = new ProductController;