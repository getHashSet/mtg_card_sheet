const router = require("express").Router();
const axios = require("axios");

router.route('/:id').get((req, res) => {
    let imageName = req.params.id;
    console.log('start')
    console.log(`https://mtgchadbucket.s3-us-west-1.amazonaws.com/${imageName}.jpg`);

    res.redirect(`https://mtgchadbucket.s3-us-west-1.amazonaws.com/${imageName}.jpg`);
  
});

module.exports = router;