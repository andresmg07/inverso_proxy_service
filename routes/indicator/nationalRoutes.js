const router = require('express').Router();

const BCCRControllers = require('../../controllers/BCCRControllers')

const DOLLAR_COLON_PURCHASE = '317'
const DOLLAR_COLON_SELL = '318'
const AVERAGE_MONEX = '3323'
const TED = '23698'
const TPM = '3541'
const TBP = '423'

router.get('/:timeRange/dollar-colon-purchase-exchange-rate', BCCRControllers.getIndicatorValue(DOLLAR_COLON_PURCHASE));
router.get('/:timeRange/dollar-colon-sell-exchange-rate', BCCRControllers.getIndicatorValue(DOLLAR_COLON_SELL));
router.get('/:timeRange/monex-exchange-rate', BCCRControllers.getIndicatorValue(AVERAGE_MONEX));
router.get('/:timeRange/tpm', BCCRControllers.getIndicatorValue(TPM));
router.get('/:timeRange/tbp', BCCRControllers.getIndicatorValue(TBP));
router.get('/:timeRange/ted', BCCRControllers.getIndicatorValue(TED));



module.exports = router;