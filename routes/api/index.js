const router = require('express-promise-router')();
// const errorHandler = require('../../middlewares/errorHandler');

router.use('/pokemon', require('./pokemon'));

module.exports = router;
