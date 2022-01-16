const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/WishlistController');

router.delete('/:productid', wishlistController.destroy);
router.post('/:productid', wishlistController.add);
router.get('/', wishlistController.index);

module.exports = router;