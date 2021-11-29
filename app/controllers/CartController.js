const { response } = require('express');
const CartService = require('../services/CartService');
class CartController {

    // [GET] /cart/add/:productid
    add(req, res) {
        const product = CartService.show(req.params.productid);
        product.then(product => {
            CartService.add(product);
            res.redirect('/shopping-cart');
        }).catch(err => {
            res.redirect('/');
        });
    }

    // [GET] /cart
    index(req, res) {
        res.render('shopping-cart');
    }
}

module.exports = new CartController;