const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authService = require('../services/AuthService');
const { sendEmail} = require('../config/nodemailer.config');
const { user } = require('../services/SiteService');
const saltRounds = 12;
const JWT_SECRET = process.env.JWT_SECRET;
class AuthController {
    // [POST] /reset-password/:id/:token
    reset = async (req, res) => {
        const { id, token } = req.params;
        const {password, confirmPassword } = req.body;

        const existedUser = await authService.getAccountByCustomerId(id);
        if (!existedUser) {
            console.log('User not found')
            res.render('forgot-password', {
                layout: false,
                existedUser,
                message: 'Username is not existed'
            });
        }

        const secret = JWT_SECRET + existedUser.password;
        try {
            const payload = jwt.verify(token, secret);
            // password validate

            if(password !== confirmPassword){
                console.log('Password not match')
                res.render('reset-password', {
                    layout: false,
                    errorCode: 1,
                });
            } else {
                const hashPassword = await bcrypt.hash(password, saltRounds);
                await authService.updatePassword(existedUser.accountid, hashPassword);
                console.log('Password updated')
            }

            res.redirect('/');
        }
        catch (error) {
            console.log(error)
            res.render('forgot-password', {
                layout: false,
                existedUser,
                message: 'Token is invalid'
            });
        }
    }

    // [POST] /forgot-password
    forgot = async (req, res) => {
        const { user } = req;
        const { username } = req.body;

        const existedUser = await authService.getAccountByUsername(username);
        let existedUserInfo;

        if (!existedUser) {
            console.log('User not found')
            res.render('forgot-password', {
                layout: false,
                existedUser,
                message: 'Username is not existed'
            });
        } else {
            // User exist and now create a One time link valid for 30 minutes
            existedUserInfo = await authService.getCustomerById(existedUser.customerid)
            const secret = JWT_SECRET + existedUser.password;
            const payload = {
                username: existedUser.username,
                id: existedUser.customerid,
            }
            const token = jwt.sign(payload, secret, { expiresIn: '30m' });
            const link = `http://${req.hostname}:3000/reset-password/${existedUser.customerid}/${token}`;
            
            // send email
            console.log(existedUserInfo.email)
            sendEmail({
                to: existedUserInfo.email,
                subject: 'DEADSHOES-RESSET PASSWORD',
                text: link,
            })
            res.send('Password reset link has been sent to your email');
        }
    }

    // [POST] /change-password
    change = async (req, res) => {
        const id = req.user.customerid;
        const { password, confirmPassword } = req.body;
        console.log(password, confirmPassword)
        const existedUser = await authService.getAccountByCustomerId(id);

        if (password !== confirmPassword) {
            res.render('account/change-password', {
                layout: false,
                existedUser,
                errorCode: 1,
            });
        } else {
            const hashPassword = await bcrypt.hash(password, saltRounds);
            await authService.updatePassword(existedUser.accountid, hashPassword);
            console.log('update password')
            res.redirect('/user-information');
        }
    }

    // [POST] /password-confirmation
    confirm = async (req, res) => {
        const account = await authService.getAccountByCustomerId(req.user.customerid);
        const {password} = req.body;
        console.log(account);
        const matchedPassword = await bcrypt.compare(password, account.password);
        if(matchedPassword){
            res.redirect('/change-password');
        } else {
            res.render('account/password-confirmation', {
                layout: false,
                errorCode: 1,
            });
        }
    }

    // [POST] /register
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
                const existedUser = await authService.getAccountByUsername(username);
                if (!existedUser) {
                    const customer = await authService.createCustomer(req.body);
                    await authService.register(username, password, customer.customerid);
                    res.redirect('/login');
                } else {
                    res.render('register', {
                        layout: false,
                        errorCode: 3
                    })
                }
            }
        } catch (error) {
            // duplicate user
            res.render('register', { layout: false, errorCode: 2 });
        }
    }
}

module.exports = new AuthController;