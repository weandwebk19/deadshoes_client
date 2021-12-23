const { response } = require('express');
const CartService = require('../services/CartService');
const ProductsService = require('../services/ProductsService');
class CartController {

    // [POST] /cart/:productid
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
        let { size } = req.body;

        try {
            if (user) {
                const userCart = await CartService.getCartByUserId(user.customerid);
                if (!userCart) {
                    cart = await CartService.createCart(user.customerid);
                } else {
                    cart = userCart;
                }
            }
            const product = await ProductsService.show(productid);

            if (!product) throw new Error('Can not find product!');

            // const { productid, productname, price, color, status, description, image, branch } = product;
            let cartLength = await CartService.findAndCountAllCart(cart.orderid);
            const shoesize = await ProductsService.loadShoeSize(req.params.productid);

            if (!size) {
                size = shoesize.rows[0].size;
            }

            if (cartLength.count != 0) {
                cartLength.rows.forEach(async (order) => {
                    if (order.productid === productid && order.size == size) {
                        console.log('this is old item - update cart');
                        // console.log(order);
                        // console.log('amount ' + order.amount)
                        // order.amount = order.amount + 1;
                        await CartService.increaseCart(order.orderid, order.productid, size);
                    }
                })

                let existedProduct = await CartService.findProductById(cart.orderid, productid, size);
                console.log(existedProduct);

                if (!existedProduct) {
                    console.log('this is new item - add to cart');
                    console.log(cart.orderid, product.productid, 1, size);
                    await CartService.addToCart(cart.orderid, product.productid, 1, size);
                }
            }

            if (cartLength.count == 0) {
                let existedProduct = await CartService.findProductById(cart.orderid, productid, size);

                if (!existedProduct) {
                    console.log('this is new item - add to cart');
                    console.log(cart.orderid, product.productid, 1, size);
                    await CartService.addToCart(cart.orderid, product.productid, 1, size);
                }
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
            res.render('shopping-cart', {
                cart,
                cartProducts,
                cartProductsDetail,
            });
        } else {
            res.render('shopping-cart', {
                cart: req.session.cart
            });
        }
    }
}

module.exports = new CartController;