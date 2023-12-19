const router = require('express').Router();

const BCCRControllers = require('../controllers/BCCRControllers')

router.get('/getTodayDollarColonSellExchangeRate', BCCRControllers.getTodayDollarColonSellExchangeRate);

module.exports = router;