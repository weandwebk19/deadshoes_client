const authService = require('../services/AuthService');
class AuthController {
    register = async (req, res) => {
        const { username, password } = req.body;
        try {
            if (!username || !password) {
                console.log('no password or username');
                res.render('register', {
                    layout: false,
                    errorCode: 1
                })
            } else {
                console.log('about to create database');
                const customer = await authService.createCustomer(req.body);
                await authService.register(username, password, customer.customerid);
                res.redirect('/login');
            }
        } catch (error) {
            // duplicate user
            res.render('register', { layout: false, errorCode: 2 });
        }
    }
}
module.exports = new AuthController;