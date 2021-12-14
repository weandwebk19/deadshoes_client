const express = require('express');
const passport = require('../middleware/auth/passport');
const router = express.Router();
// const bodyParser = require('body-parser');
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

const siteController = require('../controllers/SiteController');
const authController = require('../controllers/AuthController');


router.get('/login', siteController.login);

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login?wrongPassword',
    }),
    function (req, res) {
        console.log('passport auth success');
        if (req.user)
            res.redirect('/');
        else
            res.redirect('/login');
    },
);

router.get('/register', siteController.register);

router.post('/register', authController.register);


router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router;