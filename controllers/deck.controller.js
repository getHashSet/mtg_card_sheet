const router = require("express").Router();
const path = require('path');

router.route('/:id').get((req, res) => {
    let imageName = req.params.id.toLowerCase();
    res.sendFile(path.join(__dirname, `../decks/${imageName}.jpg`));
});

module.exports = router;