const router = require("express").Router();

router.route("/").get((req,res) => {
    console.log(req.params.id);
    res.sendFile(`../decks/dredge.jpg`);
});

// router.route('/').get((req, res) => {
//     res.send('you hit it.');
// });

module.exports = router;