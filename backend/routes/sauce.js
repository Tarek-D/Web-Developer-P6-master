const express = require('express');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const rateLimit = require('../middleware/rateLimiter')
const router = express.Router();
const sauceController = require('../controllers/sauce')

router.get('/', rateLimit, auth, sauceController.getAllSauces);
router.get('/:id', rateLimit, auth, sauceController.getOneSauce);
router.post('/', rateLimit, auth, multer, sauceController.createSauce);
router.put('/:id', rateLimit, auth, multer, sauceController.modifySauce);
router.delete('/:id', rateLimit, auth, sauceController.deleteSauce);
router.post('/:id/like', rateLimit, auth, sauceController.likeSauce);

module.exports = router;