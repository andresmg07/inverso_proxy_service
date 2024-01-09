const router = require('express').Router();

const {getIndexValue, getIndexValueWithReference} = require('../controllers/indexControllers')
const {
    indexMainMiddleware,
    indexWorthMiddleware,
    indexNumberOfEmissionsMiddleware,
    indexAnnualYieldMiddleware,
    indexMaturityAverageMiddleware,
    indexResponseMiddleware
} = require("../middleware/indexMiddlewares");

// BCCR web service constant index codes.
const IDX0M12M = {worth: '90343', annualYield: '90344', maturityAverage: '90345', numberOfEmissions: '90346'}
const IDX1A3A = {worth: '90349', annualYield: '90350', maturityAverage: '90351', numberOfEmissions: '90352'}
const IDX1A5A = {worth: '90355', annualYield: '90356', maturityAverage: '90357', numberOfEmissions: '90358'}
const IDX3A5A = {worth: '90361', annualYield: '90362', maturityAverage: '90363', numberOfEmissions: '90364'}
const IDX1A10A = {worth: '90367', annualYield: '90368', maturityAverage: '90369', numberOfEmissions: '90370'}
const IDX5A10A = {worth: '90373', annualYield: '90374', maturityAverage: '90375', numberOfEmissions: '90376'}

const IDX1A10A$ = {worth: '90385', annualYield: '90386', maturityAverage: '90387', numberOfEmissions: '90388'}

// Routes for parameterized time ranged values. Time range accepts "current", "single" and "range".
router.get('/:timeRange/colons/IDX0m12m', [indexMainMiddleware(IDX0M12M), indexWorthMiddleware, indexAnnualYieldMiddleware, indexMaturityAverageMiddleware, indexNumberOfEmissionsMiddleware, indexResponseMiddleware]);
router.get('/:timeRange/colons/IDX1a3a', [indexMainMiddleware(IDX1A3A), indexWorthMiddleware, indexAnnualYieldMiddleware, indexMaturityAverageMiddleware, indexNumberOfEmissionsMiddleware, indexResponseMiddleware]);
router.get('/:timeRange/colons/IDX1a5a', [indexMainMiddleware(IDX1A5A), indexWorthMiddleware, indexAnnualYieldMiddleware, indexMaturityAverageMiddleware, indexNumberOfEmissionsMiddleware, indexResponseMiddleware]);
router.get('/:timeRange/colons/IDX3a5a', [indexMainMiddleware(IDX3A5A), indexWorthMiddleware, indexAnnualYieldMiddleware, indexMaturityAverageMiddleware, indexNumberOfEmissionsMiddleware, indexResponseMiddleware]);
router.get('/:timeRange/colons/IDX1a10a', [indexMainMiddleware(IDX1A10A), indexWorthMiddleware, indexAnnualYieldMiddleware, indexMaturityAverageMiddleware, indexNumberOfEmissionsMiddleware, indexResponseMiddleware]);
router.get('/:timeRange/colons/IDX5a10a', [indexMainMiddleware(IDX5A10A), indexWorthMiddleware, indexAnnualYieldMiddleware, indexMaturityAverageMiddleware, indexNumberOfEmissionsMiddleware, indexResponseMiddleware]);

router.get('/:timeRange/dollars/IDX1a10a', [indexMainMiddleware(IDX1A10A$), indexWorthMiddleware, indexAnnualYieldMiddleware, indexMaturityAverageMiddleware, indexNumberOfEmissionsMiddleware, indexResponseMiddleware]);

// Routes for referenced values.
// router.get('/reference/colons/IDX0m12m', getIndexValueWithReference(IDX0M12M));
// router.get('/reference/colons/IDX1a3a', getIndexValueWithReference(IDX1A3A));
// router.get('/reference/colons/IDX1a5a', getIndexValueWithReference(IDX1A5A));
// router.get('/reference/colons/IDX3a5a', getIndexValueWithReference(IDX3A5A));
// router.get('/reference/colons/IDX1a10a', getIndexValueWithReference(IDX1A10A));
// router.get('/reference/colons/IDX5a10a', getIndexValueWithReference(IDX5A10A));
//
// router.get('/reference/dollars/IDX1a10a', getIndexValueWithReference(IDX1A10A$));

module.exports = router;