const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const controlEmail = require('../middleware/controlEmail');
const controlPassword = require('../middleware/controlPassword');

router.post('/signup', controlPassword, controlEmail, userController.signup);
router.post('/login', userController.login);

module.exports = router;