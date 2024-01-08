const router = require('express').Router();

const BCCRIndicesController = require('../controllers/BCCRIndicesController')

// BCCR web service constant indicator codes.
const IDX0M12M = {worth: '90343', interanualYield: '90344', maturityAverage: '90345', numberOfEmissions: '90346'}
const IDX1A3A = {worth: '90349', interanualYield: '90350', maturityAverage: '90351', numberOfEmissions: '90352'}
const IDX1A5A = {worth: '90355', interanualYield: '90356', maturityAverage: '90357', numberOfEmissions: '90358'}
const IDX3A5A = {worth: '90361', interanualYield: '90362', maturityAverage: '90363', numberOfEmissions: '90364'}
const IDX1A10A = {worth: '90367', interanualYield: '90368', maturityAverage: '90369', numberOfEmissions: '90370'}
const IDX5A10A = {worth: '90373', interanualYield: '90374', maturityAverage: '90375', numberOfEmissions: '90376'}
const IDX10A30A = {worth: '90379', interanualYield: '90380', maturityAverage: '90381', numberOfEmissions: '90382'}

const IDX1A5A$ = {worth: '90385', interanualYield: '90386', maturityAverage: '90387', numberOfEmissions: '90388'}

// Routes for referenced values.
router.get('/reference/colons/IDX0m12m', BCCRIndicesController.getIndexValueWithReference(IDX0M12M));
router.get('/reference/colons/IDX1a3a', BCCRIndicesController.getIndexValueWithReference(IDX1A3A));
router.get('/reference/colons/IDX1a5a', BCCRIndicesController.getIndexValueWithReference(IDX1A5A));
router.get('/reference/colons/IDX3a5a', BCCRIndicesController.getIndexValueWithReference(IDX3A5A));
router.get('/reference/colons/IDX1a10a', BCCRIndicesController.getIndexValueWithReference(IDX1A10A));
router.get('/reference/colons/IDX5a10a', BCCRIndicesController.getIndexValueWithReference(IDX5A10A));
router.get('/reference/colons/IDX10a30a', BCCRIndicesController.getIndexValueWithReference(IDX10A30A));

router.get('/reference/dollars/IDX1a5a', BCCRIndicesController.getIndexValueWithReference(IDX1A5A$));

// Routes for parameterized time ranged values. Time range accepts "current", "single" and "range".
router.get('/:timeRange/colons/IDX0m12m', BCCRIndicesController.getIndexValue(IDX0M12M));
router.get('/:timeRange/colons/IDX1a3a', BCCRIndicesController.getIndexValue(IDX1A3A));
router.get('/:timeRange/colons/IDX1a5a', BCCRIndicesController.getIndexValue(IDX1A5A));
router.get('/:timeRange/colons/IDX3a5a', BCCRIndicesController.getIndexValue(IDX3A5A));
router.get('/:timeRange/colons/IDX1a10a', BCCRIndicesController.getIndexValue(IDX1A10A));
router.get('/:timeRange/colons/IDX5a10a', BCCRIndicesController.getIndexValue(IDX5A10A));
router.get('/:timeRange/colons/IDX10a30a', BCCRIndicesController.getIndexValue(IDX10A30A));

router.get('/:timeRange/dollars/IDX1a5a', BCCRIndicesController.getIndexValue(IDX1A5A$));

module.exports = router;