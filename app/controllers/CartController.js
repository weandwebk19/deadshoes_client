const { response } = require('express');
const CartService = require('../services/CartService');
const ProductsService = require('../services/ProductsService');
class CartController {

    // [GET] /cart/add/:productid
    add = async (req, res, next) => {
        // const { productid } = req.params;
        // CartService.add(productid).catch(err => {
        //     res.status(500).json({
        //         message: err.message
        //     });
        // });

        // if (typeof req.session.cart == 'undefined') {
        //     req.session.cart = [];
        //     req.session.cart.push({
        //         productId: productid,
        //         qty: 1,
        //         price: parseFloat(req.body.price).toFixed(2),
        //         image: req.body.image,
        //     });
        // } else {
        //     const cart = req.session.cart;
        //     const newItem = true;

        //     for(let i = 0; i < cart.length; i++) {
        //         if (cart[i].productId == productid) {
        //             cart[i].qty++;
        //             newItem = false;
        //             break;
        //         }
        //     }

        //     if(newItem) {
        //         cart.push({
        //             productId: productid,
        //             qty: 1,
        //             price: parseFloat(req.body.price).toFixed(2),
        //             image: req.body.image,
        //         });
        //     }
        // }
        // console.log(req.session.cart);
        // res.redirect('/cart');

        const { user } = req;
        let { cart } = req.session.unauthId;
        const { productid } = req.params;

        //console.log(user, cart, productid);

        let flagNewItem = true;
        try {
            if (user) {
                const userCart = await CartService.getCartByUserId(user.customerid);
                if (!userCart) {
                    console.log('this is new user - create cart')
                    cart = CartService.createCart(user.customerid);
                } else {
                    console.log('this is old user - get cart')
                    cart = userCart;
                }
            }
            const product = await ProductsService.show(productid);

            if (!product) throw new Error('Can not find product!');

            // const { productid, productname, price, color, status, description, image, branch } = product;
            let cartLength = await CartService.findAndCountAllCart(cart.orderid);

            cartLength.rows.forEach(async (order) => {
                if (order.productid === productid) {
                    console.log('this is old item - update cart');
                    console.log(order);
                    console.log('amount ' + order.amount)
                    order.amount = order.amount + 1;
                    CartService.increaseCart(order.orderid);
                    //await CartService.increaseCart(order.orderid, order.amount);

                    flagNewItem = false;
                }
            }) 

            if (flagNewItem==true) {
                console.log('this is new item - update cart');
                CartService.addToCart(cart.orderid, product.productid, 1, product.size);
            }

            req.session.cart = cartLength;
            res.status(200).json({
                msg: 'Successfully added to cart!',
                user: 'Add to cart successfuly'
            });

        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'ValidatorError',
                user: error.message,
            });
        }
    }


    // [GET] /cart
    index(req, res) {
        res.render('shopping-cart');
    }
}

module.exports = new CartController;