const express = require('express');
const router = express.Router();

const cartController = require('../controllers/CartController');

// cartController.index
router.get('/', cartController.index);

module.exports = router;