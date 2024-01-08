const router = require('express').Router();

const BCCRIndicatorsController = require('../controllers/BCCRIndicatorsController')

// BCCR web service constant indicator codes.
const DOLLAR_COLON_PURCHASE = '317'
const DOLLAR_COLON_SELL = '318'
const AVERAGE_MONEX = '3323'
const TED = '23698'
const TPM = '3541'
const TBP = '423'

// Routes for referenced values
router.get('/reference/dollar-colon-purchase-exchange-rate', BCCRIndicatorsController.getIndicatorValueWithReference(DOLLAR_COLON_PURCHASE));
router.get('/reference/dollar-colon-sell-exchange-rate', BCCRIndicatorsController.getIndicatorValueWithReference(DOLLAR_COLON_SELL));
router.get('/reference/monex-exchange-rate', BCCRIndicatorsController.getIndicatorValueWithReference(AVERAGE_MONEX));
router.get('/reference/tpm', BCCRIndicatorsController.getIndicatorValueWithReference(TPM));
router.get('/reference/tbp', BCCRIndicatorsController.getIndicatorValueWithReference(TBP));
router.get('/reference/ted', BCCRIndicatorsController.getIndicatorValueWithReference(TED));

// Routes for parameterized time ranged values. Time range accepts "current", "single" and "range".
router.get('/:timeRange/dollar-colon-purchase-exchange-rate', BCCRIndicatorsController.getIndicatorValue(DOLLAR_COLON_PURCHASE));
router.get('/:timeRange/dollar-colon-sell-exchange-rate', BCCRIndicatorsController.getIndicatorValue(DOLLAR_COLON_SELL));
router.get('/:timeRange/monex-exchange-rate', BCCRIndicatorsController.getIndicatorValue(AVERAGE_MONEX));
router.get('/:timeRange/tpm', BCCRIndicatorsController.getIndicatorValue(TPM));
router.get('/:timeRange/tbp', BCCRIndicatorsController.getIndicatorValue(TBP));
router.get('/:timeRange/ted', BCCRIndicatorsController.getIndicatorValue(TED));


module.exports = router;