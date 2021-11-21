
class CartController {

    // [GET] /cart
    index(req, res) {
        res.render('shopping-cart');
    }
}

module.exports = new CartController;