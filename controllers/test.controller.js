const router = require('express').Router();

router.route('/').get(function(req, res) {
    res.send('this was only a test');
});

router.route('/').post(function(req,res) {
    res.send("i got this!" + req.body.test);
});

module.exports = router;