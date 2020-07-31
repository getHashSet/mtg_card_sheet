const router = require("express").Router();
const axios = require("axios");

router.route('/:id').get((req, res) => {
    let imageName = req.params.id;
    console.log('start')
    console.log( path.join(__dirname, `../decks/${imageName}.jpg`));

    res.sendFile(path.join(__dirname, `../decks/${imageName}.jpg`));
  
});

module.exports = router;