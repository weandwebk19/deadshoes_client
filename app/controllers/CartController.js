const CartService = require('../services/CartService');
const ProductsService = require('../services/ProductsService');
const AuthService = require('../services/AuthService');
class CartController {

    // [POST] /cart/:productid
    add = async (req, res, next) => {
        const { user } = req;
        let cart;
        let unauthId = req.session.unauthId;
        const { productid } = req.params;
        let { size, amount } = req.body;

        try {
            if (user) {
                const userCart = await CartService.getCartByUserId(user.customerid);
                if (!userCart) {
                    cart = await CartService.createCart(user.customerid);
                } else {
                    cart = userCart;
                }
            }
            else {
                // create user account and cart for unauthId user
                const userCart = await CartService.getCartByUserId(unauthId);
                if (!userCart) {
                    await AuthService.createUnauthCustomer(unauthId);
                    cart = await CartService.createCart(unauthId);
                } else {
                    cart = userCart;
                }
            }
            const product = await ProductsService.show(productid);

            if (!product) throw new Error('Can not find product!');

            let cartProducts = await CartService.findAndCountAllDeletedCart(cart.orderid);
            const shoesize = await ProductsService.loadShoeSize(req.params.productid);

            // if user add-to-cart directly from the products list, the default shoes size is the first index of its size.
            if (!size) {
                size = shoesize.rows[0].size;
            }

            if (cartProducts.count != 0) {
                const currProductsInCart = await CartService.findDeletedProductById(cart.orderid, productid, size);
                console.log(currProductsInCart);
                if (currProductsInCart && currProductsInCart.deletedAt == null) {
                    console.log('this is old item - update');
                    await CartService.increaseCart(cart.orderid, productid, amount, size);
                }
                else if (currProductsInCart && currProductsInCart.deletedAt != null) {
                    let existedProduct = await CartService.findDeletedProductById(cart.orderid, productid, size);
                    if (existedProduct) {
                        console.log('this is deleted item - update');
                        await CartService.restoreCart(cart.orderid, existedProduct.productid, size);
                        await CartService.increaseCart(cart.orderid, existedProduct.productid, amount, size);
                    }
                }
                else {
                    console.log('this is new item - create');
                    await CartService.addToCart(cart.orderid, productid, amount, size);
                }
            }


            // let cartLength = await CartService.findAndCountAllCart(cart.orderid);
            // const shoesize = await ProductsService.loadShoeSize(req.params.productid);

            // // if user add to cart directly from the products list, the default shoes size is the first index of its size.
            // if (!size) {
            //     size = shoesize.rows[0].size;
            // }

            // if (cartLength.count != 0) {
            //     cartLength.rows.forEach(async (order) => {
            //         if (order.productid === productid && order.size == size) {
            //             console.log('this is old item - update cart');
            //             // console.log(order);
            //             // console.log('amount ' + order.amount)
            //             // order.amount = order.amount + 1;
            //             await CartService.increaseCart(order.orderid, order.productid, amount, size);
            //         } else {
            //             let existedProduct = await CartService.findDeletedProductById(cart.orderid, productid, size);
            //             if (existedProduct) {
            //                 console.log('this is deleted item - update cart');
            //                 await CartService.restoreCart(order.orderid, existedProduct.productid, size);
            //                 await CartService.increaseCart(order.orderid, existedProduct.productid, amount, size);
            //             } else {
            //                 console.log('this is new item - create cart');
            //                 await CartService.addToCart(cart.orderid, product.productid, amount, size);
            //             }
            //         }
            //     })

            //     // let existedProduct = await CartService.findAllProductById(cart.orderid, productid, size);
            //     // console.log("inside")
            //     // console.log(existedProduct);

            //     // if (!existedProduct) {
            //     //     console.log('this is new item - add to cart');
            //     //     // console.log(cart.orderid, product.productid, amount, size);
            //     //     await CartService.addToCart(cart.orderid, product.productid, amount, size);
            //     // }
            // }

            if (cartProducts.count == 0) {
                // let existedProduct = await CartService.findProductById(cart.orderid, productid, size);
                // if (!existedProduct) {
                console.log('this is new item - add to cart');
                await CartService.addToCart(cart.orderid, product.productid, 1, size);
                // }
            }

            req.session.cart = cartProducts;
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

    // [PUT] /cart/:productid
    update = async (req, res, next) => {
        const { productid } = req.params;
        const { value, size } = req.body.bias;
        const { user } = req;
        let unauthId = req.session.unauthId;
        let cart;

        try {
            if (user) {
                cart = await CartService.getCartByUserId(user.customerid);
            }
            else {
                cart = await CartService.getCartByUserId(unauthId);
            }
            const product = await ProductsService.show(productid);
            let cartLength;

            if (!product) throw new Error('Can not find product!');

            const currProduct = await CartService.findProductById(cart.orderid, productid, size);

            if (value === 1) {
                console.log('plus item');
                await CartService.increaseCart(cart.orderid, productid, 1, size);
            }
            else if (value === -1 && currProduct.amount > 1) {
                console.log('minus item');
                await CartService.decreaseCart(cart.orderid, productid, 1, size);
            }

            cartLength = await CartService.findAndCountAllCart(cart.orderid);

            let totalPrice = 0;

            const cartProductsDetail = [];

            for (let i = 0; i < cartLength.count; i++) {
                const product = await ProductsService.show(cartLength.rows[i].productid);
                let currTotalPrice = await Math.round((product.price * cartLength.rows[i].amount) * 100) / 100;
                totalPrice += currTotalPrice;
                await cartProductsDetail.push({ product, size: cartLength.rows[i].size, amount: cartLength.rows[i].amount, total: currTotalPrice });
            }

            // console.log(cartProductsDetail);

            totalPrice = Math.round(totalPrice * 100) / 100;
            await CartService.updateCart(cart.orderid, totalPrice);

            req.session.cart = cartLength;
            res.status(200).json({
                msg: 'success',
                user: 'Update cart successfuly',
                data: { totalPrice, cartProductsDetail }
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

    // [DELETE] /cart/:product/:size
    destroy = async (req, res, next) => {
        const { productid, size } = req.params;
        const { user } = req;
        const unauthId = req.session.unauthId;
        let cart;

        if (user) {
            cart = await CartService.getCartByUserId(user.customerid);
        }
        else {
            cart = await CartService.getCartByUserId(unauthId);
        }
        const product = await ProductsService.show(productid);
        // let cartLength = await CartService.findAndCountAllCart(cart.orderid);
        console.log(cart.orderid, productid, size);
        if (!product) throw new Error('Can not find product!');

        // if (cartLength.count != 0) {
        //     cartLength.rows.forEach(async (order) => {
        //         if (order.productid === productid && order.size == size) {
        await CartService.deleteCart(cart.orderid, productid, size);
        //     }
        // })
        //}

        res.redirect('back');
    }


    // [GET] /cart
    index = async (req, res, next) => {
        const { user } = req;
        const unauthId = req.session.unauthId;
        let cart;

        if (user) {
            const userCart = await CartService.getCartByUserId(user.customerid);
            if (!userCart) {
                cart = await CartService.createCart(user.customerid);
            } else {
                cart = userCart;
            }
        }
        else {
            const existedUnauthUser = await AuthService.getCustomerById(unauthId);
            if (existedUnauthUser) {
                // create user account and cart for unauthId user
                const userCart = await CartService.getCartByUserId(unauthId);
                if (!userCart) {
                    cart = await CartService.createCart(unauthId);
                } else {
                    cart = userCart;
                }
            } else {
                await AuthService.createUnauthCustomer(unauthId);
                cart = await CartService.createCart(unauthId);
            }
        }

        const cartLength = await CartService.findAndCountAllCart(cart.orderid);
        let totalPrice = 0;

        const cartProductsDetail = [];

        for (let i = 0; i < cartLength.count; i++) {
            const product = await ProductsService.show(cartLength.rows[i].productid);
            cartProductsDetail.push({ product, size: cartLength.rows[i].size, amount: cartLength.rows[i].amount });
            totalPrice += (product.price * cartLength.rows[i].amount);
        }
        totalPrice = Math.round(totalPrice * 100) / 100;
        await CartService.updateCart(cart.orderid, totalPrice);


        res.render('shopping-cart', {
            cart,
            cartLength,
            cartProductsDetail,
            totalPrice,
        });
    }
}

module.exports = new CartController;