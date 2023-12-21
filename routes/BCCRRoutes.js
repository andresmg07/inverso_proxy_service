const router = require('express').Router();

const BCCRControllers = require('../controllers/BCCRControllers')

const DOLLAR_COLOR_BUY_CODE = '317'
const DOLLAR_COLOR_SELL_CODE = '318'
const AVERAGE_MONEX = '3323'

router.get('/getTodayDollarColonBuyExchangeRate', BCCRControllers.getIndicatorCurrentValue(DOLLAR_COLOR_BUY_CODE));
router.get('/getTodayDollarColonSellExchangeRate', BCCRControllers.getIndicatorCurrentValue(DOLLAR_COLOR_SELL_CODE));
router.get('/getTodayMonexExchangeRate', BCCRControllers.getIndicatorCurrentValue(AVERAGE_MONEX));


module.exports = router;