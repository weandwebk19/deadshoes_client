const ProductService = require('../services/ProductsService');

class SiteController {

    // [GET] /home/contact
    contact = async(req, res) => {
        res.render('contact');
    }

    // [GET] /home
    home = async(req, res) => {
        const products = await ProductService.index();
        res.render('home', {
            layout: false,
            products});
    }
}

module.exports = new SiteController;