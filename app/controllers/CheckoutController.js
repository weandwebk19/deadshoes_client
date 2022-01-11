const { response } = require('express');
const CartService = require('../services/CartService');
const ProductsService = require('../services/ProductsService');
const SiteService = require('../services/SiteService');
class CheckoutController {
    //[GET] /checkout
    index = async (req, res, next) => {
        const { user } = req;
        const unauthId = req.session.unauthId

        if (user) {
            const cart = await CartService.getCartByUserId(user.customerid);
            const cartProducts = await CartService.findAndCountAllCart(cart.orderid);
            const customer = await SiteService.user(req.user.customerid);

            let totalPrice = cart.price;

            const cartProductsDetail = [];

            for (let i = 0; i < cartProducts.count; i++) {
                const product = await ProductsService.show(cartProducts.rows[i].productid);
                cartProductsDetail.push({ product, size: cartProducts.rows[i].size, amount: cartProducts.rows[i].amount });
            }

            res.render('checkout', {
                cart,
                cartProducts,
                cartProductsDetail,
                totalPrice,
                customer
            });
        } else {
            const cart = await CartService.getCartByUserId(unauthId);
            const cartProducts = await CartService.findAndCountAllCart(cart.orderid);

            let totalPrice = await cart.price;

            const cartProductsDetail = [];

            for (let i = 0; i < cartProducts.count; i++) {
                const product = await ProductsService.show(cartProducts.rows[i].productid);
                cartProductsDetail.push({ product, size: cartProducts.rows[i].size, amount: cartProducts.rows[i].amount });
            }

            res.render('checkout', {
                cart,
                cartProducts,
                cartProductsDetail,
                totalPrice,
            });
        }

        res.render('checkout')
    }

    //[DELETE] /checkout/:orderid
    destroy = async (req, res, next) => {
        const { user } = req;
        const unauthId = req.session.unauthId;
        const { orderid } = req.params;

        await CartService.updatePurchased(orderid);
        await CartService.deletePurchased(orderid);
        await CartService.deletePurchasedCart(orderid);

        if (user) {
            await CartService.updatePurchased(orderid);
            await CartService.deletePurchased(orderid);
            res.redirect('/history');
        } else {
            res.redirect('/products');
        }
    }
}

module.exports = new CheckoutController;