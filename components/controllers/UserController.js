
class UserController {
    // [GET] /user/information
    show(req, res, next) {
        res.render('user-information');
    }
}

module.exports = new UserController;
