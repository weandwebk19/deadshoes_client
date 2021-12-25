const express = require('express');
const router = express.Router();

const cartController = require('../controllers/CartController');

router.post('/:productid', cartController.add);
router.put('/:productid', cartController.update);
router.get('/', cartController.index);

module.exports = router;