const express = require('express');

const router = express.Router();

const Sauce = require('../models/Sauce');
const sauceController = require('../controllers/sauce')

router.get('/', sauceController.getAllSauces);
router.get('/:id', sauceController.getOneSauce);
router.post('/', sauceController.createSauce);
router.put('/:id', sauceController.modifySauce);
router.delete('/:id', sauceController.deleteSauce);
router.post('/:id/like', sauceController.likeSauce);

module.exports = router;