const router = require("express").Router();
const axios = require("axios");

router.route("/:id").get((req, res) => {
  
    const cardName = req.params.id;

    console.log("------------------");
    console.log(cardName)
    console.log("------------------");
    // catch errors
    if (cardName.length && cardName.length < 2) {
        res.send({msg: "Card not found."});
    };

    axios({
        method: "get",
        url: `https://api.scryfall.com/cards/named?fuzzy=${encodeURI(cardName)}&q=type%3Atoken`,
    })
    .then((scryfallData) => {
        res.send(scryfallData.data.image_uris.normal);
    }).catch(err => {
        res.send(err);
    });

});

module.exports = router;