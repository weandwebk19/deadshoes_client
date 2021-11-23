const express = require('express');
const router = express.Router();
const userController = require('../components/controllers/UserController');
/* GET users listing. */
router.get('/information', userController.show);

module.exports = router;
