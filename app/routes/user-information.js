const express = require('express');
const router = express.Router();
const siteController = require('../controllers/SiteController');

router.post('/', siteController.updateAccount);
router.get('/', siteController.showAccount);

module.exports = router;
