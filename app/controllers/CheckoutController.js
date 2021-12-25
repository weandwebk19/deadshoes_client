const { response } = require('express');
const CartService = require('../services/CartService');
const ProductsService = require('../services/ProductsService');

class CheckoutController {
    //[GET] /checkout
    index = async (req, res, next) => {
        const { user } = req;

        if (user) {

            const cart = await CartService.getCartByUserId(user.customerid);
            const cartProducts = await CartService.getCartProducts(cart.orderid);

            const cartProductsDetail = [];

            for (let i = 0; i < cartProducts.count; i++) {
                const product = await ProductsService.show(cartProducts.rows[i].productid);
                cartProductsDetail.push(product);
            }

            console.log(cartProductsDetail)

            console.log(cart)
            res.render('checkout', {
                cart,
                cartProducts,
                cartProductsDetail,
            });
        } else {
            res.render('checkout', {
                cart: req.session.cart
            });
        }

        res.render('checkout')
    }


}

module.exports = new CheckoutController;