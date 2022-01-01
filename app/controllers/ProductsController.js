const { getPagination } = require('../../public/js/pagination');
const { getPagingData } = require('../../public/js/pagination');
const ProductsService = require('../services/ProductsService');
const CartService = require('../services/CartService');
const AuthService = require('../services/AuthService');
class ProductController {

    // [GET] /products
    list = async (req, res) => {
        const { page, size, term } = req.query;
        const { limit, offset } = getPagination(page - 1, size);
        const { user } = req;
        let cart;
        let unauthId = req.session.unauthId;
        const { productid } = req.params;
        let shoesize = req.body.size;

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

        const data = await ProductsService.listProduct(term, limit, offset);
            const response = getPagingData(data, page, limit);
            const cartItems = await CartService.countCartItems(cart.orderid);
            res.render('products/products', {
                products: response.items,
                totalPages: response.totalPages,
                currentPage: response.currentPage,
                totalItems: response.totalItems,
                cartItems
        });
    }

    // // [GET] /product
    // pagi = async (req, res) => {
    //     let { term, color, price_start, price_end, page } = req.query;
    //     if (page) {
    //         page = parseInt(page);
    //         if (page < 1) {
    //             page = 1;
    //         }
    //         let skipAmount = (page - 1) * 9;
    //         console.log("1----")
    //         await ProductsService.pagin(term, color, price_start, price_end, 9, skipAmount)
    //             .then((data) => {
    //                 res.json(data);
    //             })
    //             .catch(err => {
    //                 res.send(err);
    //             })
    //     } else {
    //         console.log("2----")
    //         await models.products.findAll()
    //             .then((data) => {
    //                 res.json(data);
    //             })
    //             .catch(err => {
    //                 res.send(err);
    //             })
    //     }
    // }

    // [POST] /products/filter/:slug
    filter = async (req, res, next) => {
        const { page, size, color, price_start, price_end } = req.body;
        const { limit, offset } = getPagination(page, size);

        const data = await ProductsService.filter(color, price_start, price_end, limit, offset);
        const response = getPagingData(data, page, limit);
        res.render('products/searchProd', {
            layout: false,
            products: response.items,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
            totalItems: response.totalItems,
        });

        //const filterProd = ProductsService.filter(color, price_start, price_end, !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);

        // filterProd.then(products => {
        //     let view = {
        //         products: products.rows,
        //         layout: false,
        //         raw: true,
        //         // pagination: {
        //         //     page: req.query.page || 1,
        //         //     pageCount: Math.ceil(products.count / perPage),
        //         // }
        //     }
        //     res.render('products/searchProd', view);
        // })
        //     .catch(next);
    }

    // // [GET] /products/search
    // search(req, res, next) {
    //     let page = +req.query.page || 1;
    //     const perPage = 9;
    //     let { term = '' } = req.query;

    //     term = term.toLowerCase();
    //     const products = ProductsService.searchByName(term, !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);

    //     console.log("my term: " + term);
    //     products.then(products => {
    //         res.render('products/products', {
    //             products: products.rows,
    //             pagination: {
    //                 page: req.query.page || 1,
    //                 pageCount: Math.ceil(products.count / perPage),
    //             },
    //         })
    //     })
    //         .catch(next);
    // }

    // // [POST] /products/search (AJAX)
    // search (req, res, next) {
    //     let search = req.body.data;

    //     // res.send('my search: ' + search);
    //     //console.log('my search: ' + search);

    //     const searchProd = ProductsService.search(search, !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);

    //     searchProd.then(products => {
    //         let view = {
    //             products,
    //             layout: false,
    //             raw: true,
    //             pagination: {
    //                 page: req.query.page || 1,
    //                 pageCount: Math.ceil(products.count/perPage),
    //             }
    //         }
    //         res.render('products/searchProd', view);
    //     })
    // }


    // Display a certain product by its id
    // [GET] /products/:productid
    show = async (req, res, next) => {
        const productDetail = await ProductsService.show(req.params.productid);
        const shoesize = await ProductsService.loadShoeSize(req.params.productid);

        // const {brand} = productDetail;
        const relatedProd = await ProductsService.index(0, 8);
        // const relatedProducts = ProductService.index(0);

        res.render('products/product-detail', {
            productDetail,
            shoesize: shoesize.rows,
            relatedProd: relatedProd || null
        })
    }


    // // [GET] /products
    // index = async (req, res) => {
    //     const products = await ProductsService.index(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);
    //     res.render('products/products', {
    //         products,
    //         pagination: {
    //             page: req.query.page || 1,
    //             pageCount: 9
    //         }
    //     });
    // }


}

module.exports = new ProductController;