const ProductsService = require('../services/ProductsService');
const SiteService = require('../services/SiteService');
const CartService = require('../services/CartService');
const AuthService = require('../services/AuthService');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
class SiteController {
    // [GET] /reset/:id/:token
    reset = async (req, res) => {
        const { id, token } = req.params;
        console.log(id)
        const existedUser = await AuthService.getAccountByCustomerId(id);
        if (!existedUser) {
            res.render('reset-password', {
                layout: false,
                existedUser,
                message: 'User is not existed'
            });
        }

        const secret = process.env.JWT_SECRET + existedUser.password;
        try {
            const payload = jwt.verify(token, secret);
            res.render('reset_password', {
                layout: false,
                username: existedUser.username,
            });
        } catch (error) {
            res.render('reset-password', {
                layout: false,
                existedUser,
                message: 'Token is invalid'
            });
        }
    }

    // [GET] /forgot-password
    forgot = async (req, res) => {
        res.render('forgot-password', { layout: false });
    }

    // [GET] /change-password/
    change = async (req, res) => {
        const customer = await SiteService.user(req.user.customerid);
        const account = await AuthService.getAccountByCustomerId(customer.customerid);

        res.render('account/change-password', {
            layout: false,
            account,
        })
    }

    // [GET] /password-confirmation
    confirm = async (req, res) => {
        const customer = await SiteService.user(req.user.customerid);
        const account = await AuthService.getAccountByCustomerId(customer.customerid);
        console.log(customer)
        res.render('account/password-confirmation', { layout: false, account });
    }

    // [POST] /user-information
    updateAccount = async (req, res) => {
        const { name, email, address, phone } = req.body;
        await AuthService.updateAccount(req.user.customerid, name, email, address, phone);
        console.log('update successful')
        res.redirect('/user-information');
    }

    //[GET] /user-information
    showAccount = async (req, res) => {
        const customer = await SiteService.user(req.user.customerid);
        res.render('account/user-information', { customer });
    }

    // [GET] /login
    login = async (req, res) => {
        res.render('login', {
            layout: false,
            wrongPassword: req.query.wrongPassword !== undefined
        });
    }

    // [GET] /register
    register = async (req, res) => {
        res.render('register', { layout: false });
    }

    // [GET] /contact
    contact = async (req, res) => {
        res.render('contact');
    }

    // [GET] /history
    history = async (req, res) => {
        const { user } = req;
        const unauthId = req.session.unauthId;
        let cart;

        console.log(user.customerid)
        if (user) {
            cart = await CartService.getPurchaseCartByUserId(user.customerid);
        }
        else {
            // create user account and cart for unauthId user
            cart = await CartService.getPurchaseCartByUserId(unauthId);
        }

        let orderids;
        const cartProductsDetail = [];

        const orderidSet = new Set();
        for (let i = 0; i < cart.count; i++) {
            orderidSet.add(cart.rows[i].orderid);
        }
        orderids = Array.from(orderidSet);

        for (let i = 0; i < orderids.length; i++) {
            const cartLength = await CartService.findAndCountAllPurchased(orderids[i]);

            for (let i = 0; i < cartLength.count; i++) {
                const product = await ProductsService.show(cartLength.rows[i].productid);
                cartProductsDetail.push({ product, size: cartLength.rows[i].size, amount: cartLength.rows[i].amount });
            }
        }

        res.render('purchase-history', {
            cart,
            cartProductsDetail,
        });
    }

    // [GET] /
    home = async (req, res) => {
        const products = await ProductsService.index();
        res.render('home', {
            layout: false,
            products
        });
    }
}

module.exports = new SiteController;