const express = require('express');
const router = express.Router();

const cartController = require('../components/controllers/CartController');

// cartController.index
router.use('/', cartController.index);

module.exports = router;