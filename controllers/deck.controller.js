const router = require("express").Router();
const axios = require("axios");

router.route('/:id').get((req, res) => {
    let imageName = req.params.id;
    console.log('start')
    console.log(`https://manaleaks.com/${imageName}.jpg`);

    res.redirect(`https://manaleaks.com/${imageName}.jpg`);
  
});

module.exports = router;