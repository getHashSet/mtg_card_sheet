const router = require("express").Router();
const axios = require("axios");
const jimp = require("jimp");
const path = require("path");

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
       //   res.send(scryfallData.data.image_uris.normal);

      console.log("jimp started.");
      // ////////// //
      // // JIMP // //
      // ////////// //

      console.log(`image url ${scryfallData.data.image_uris.normal}`);

      jimp.read(scryfallData.data.image_uris.normal).then((image) => {
        console.log("read image");
        image.write(`./tokens/${cardName}.jpg`, function () {
          console.log("wrote image");

          const theHerokuPath = path.join(
            __dirname,
            `../tokens/${cardName}.jpg`
          );

          console.log(theHerokuPath);
          res.sendFile(path.join(__dirname, `../tokens/${cardName}.jpg`));
        });
      });
    })
    .catch((err) => {
      res.send(err);
    });

});

module.exports = router;