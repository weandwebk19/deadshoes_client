const express = require('express');
const router = express.Router();

const CheckoutController = require('../controllers/CheckoutController');

router.delete('/:orderid', CheckoutController.destroy);
router.get('/', CheckoutController.index);

module.exports = router;