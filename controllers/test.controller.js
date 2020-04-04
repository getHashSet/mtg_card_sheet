const router = require('express').Router();

router.route('/').get(function(req, res) {
    res.send('this was only a test');
});

module.exports = router;