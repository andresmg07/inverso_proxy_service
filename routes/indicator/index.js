const router = require('express').Router();

const nationalRoutes = require('./nationalRoutes')
const internationalRoutes = require('./internationalRoutes')

router.use('/national', nationalRoutes);
router.use('/international', internationalRoutes);

module.exports = router;