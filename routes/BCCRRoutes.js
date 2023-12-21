const router = require('express').Router();

const BCCRControllers = require('../controllers/BCCRControllers')

const DOLLAR_COLOR_BUY = '317'
const DOLLAR_COLOR_SELL = '318'
const AVERAGE_MONEX = '3323'
const TED = '23698'
const TPM = '24189'
const TBP = '85977'

router.get('/getCurrentDollarColonBuyExchangeRate', BCCRControllers.getIndicatorCurrentValue(DOLLAR_COLOR_BUY));
router.get('/getCurrentDollarColonSellExchangeRate', BCCRControllers.getIndicatorCurrentValue(DOLLAR_COLOR_SELL));
router.get('/getCurrentMonexExchangeRate', BCCRControllers.getIndicatorCurrentValue(AVERAGE_MONEX));
router.get('/getCurrentTPM', BCCRControllers.getIndicatorCurrentValue(TPM));
router.get('/getCurrentTBP', BCCRControllers.getIndicatorCurrentValue(TBP));
router.get('/getCurrentTED', BCCRControllers.getIndicatorCurrentValue(TED));



module.exports = router;