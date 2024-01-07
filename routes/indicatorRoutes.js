const router = require('express').Router();

const BCCRControllers = require('../controllers/BCCRControllers')

// BCCR web service constant indicator codes.
const DOLLAR_COLON_PURCHASE = '317'
const DOLLAR_COLON_SELL = '318'
const AVERAGE_MONEX = '3323'
const TED = '23698'
const TPM = '3541'
const TBP = '423'

// Routes for referenced values
router.get('/reference/dollar-colon-purchase-exchange-rate', BCCRControllers.getIndicatorValueWithReference(DOLLAR_COLON_PURCHASE));
router.get('/reference/dollar-colon-sell-exchange-rate', BCCRControllers.getIndicatorValueWithReference(DOLLAR_COLON_SELL));
router.get('/reference/monex-exchange-rate', BCCRControllers.getIndicatorValueWithReference(AVERAGE_MONEX));
router.get('/reference/tpm', BCCRControllers.getIndicatorValueWithReference(TPM));
router.get('/reference/tbp', BCCRControllers.getIndicatorValueWithReference(TBP));
router.get('/reference/ted', BCCRControllers.getIndicatorValueWithReference(TED));

// Routes for parameterized time ranged values. Time range accepts "current", "single" and "range".
router.get('/:timeRange/dollar-colon-purchase-exchange-rate', BCCRControllers.getIndicatorValue(DOLLAR_COLON_PURCHASE));
router.get('/:timeRange/dollar-colon-sell-exchange-rate', BCCRControllers.getIndicatorValue(DOLLAR_COLON_SELL));
router.get('/:timeRange/monex-exchange-rate', BCCRControllers.getIndicatorValue(AVERAGE_MONEX));
router.get('/:timeRange/tpm', BCCRControllers.getIndicatorValue(TPM));
router.get('/:timeRange/tbp', BCCRControllers.getIndicatorValue(TBP));
router.get('/:timeRange/ted', BCCRControllers.getIndicatorValue(TED));


module.exports = router;