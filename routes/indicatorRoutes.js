const router = require('express').Router();

const {getIndicatorValueWithReference, getIndicatorValue} = require('../controllers/indicatorControllers')

// BCCR web service constant indicator codes.
const DOLLAR_COLON_PURCHASE = '317'
const DOLLAR_COLON_SELL = '318'
const AVERAGE_MONEX = '3323'
const TED = '23698'
const TPM = '3541'
const TBP = '423'

// Routes for parameterized time ranged values. Time range accepts "current", "single" and "range".
router.get('/:timeRange/dollar-colon-purchase-exchange-rate', getIndicatorValue(DOLLAR_COLON_PURCHASE));
router.get('/:timeRange/dollar-colon-sell-exchange-rate', getIndicatorValue(DOLLAR_COLON_SELL));
router.get('/:timeRange/monex-exchange-rate', getIndicatorValue(AVERAGE_MONEX));
router.get('/:timeRange/tpm', getIndicatorValue(TPM));
router.get('/:timeRange/tbp', getIndicatorValue(TBP));
router.get('/:timeRange/ted', getIndicatorValue(TED));

// Routes for referenced values
router.get('/reference/dollar-colon-purchase-exchange-rate', getIndicatorValueWithReference(DOLLAR_COLON_PURCHASE));
router.get('/reference/dollar-colon-sell-exchange-rate', getIndicatorValueWithReference(DOLLAR_COLON_SELL));
router.get('/reference/monex-exchange-rate', getIndicatorValueWithReference(AVERAGE_MONEX));
router.get('/reference/tpm', getIndicatorValueWithReference(TPM));
router.get('/reference/tbp', getIndicatorValueWithReference(TBP));
router.get('/reference/ted', getIndicatorValueWithReference(TED));


module.exports = router;