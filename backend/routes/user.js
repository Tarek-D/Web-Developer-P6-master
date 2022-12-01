const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const rateLimit = require('../middleware/rateLimiter');

router.post('/signup', rateLimit, userController.signup);
router.post('/login', rateLimit, userController.login);

module.exports = router;