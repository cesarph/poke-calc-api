
const router = require('express-promise-router')();

router.use('/api/v1', require('./api'));

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is running'
  });
});

module.exports = router;
