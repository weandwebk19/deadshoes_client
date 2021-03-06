const express = require('express');
const passport = require('../middleware/auth/passport');
const router = express.Router();

const siteController = require('../controllers/SiteController');
const authController = require('../controllers/AuthController');

router.post('/reset-password/:id/:token', authController.reset);
router.get('/reset-password/:id/:token', siteController.reset);

router.post('/forgot-password', authController.forgot);
router.get('/forgot-password', siteController.forgot);

router.post('/change-password', authController.change);
router.get('/change-password', siteController.change);

router.post('/password-confirmation', authController.confirm);
router.get('/password-confirmation', siteController.confirm);

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

router.post('/register', authController.register);
router.get('/register', siteController.register);

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router;