const router = require('express').Router();
const apiRoutes = require('./api');

//middleware for routes
router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;