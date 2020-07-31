const router = require("express").Router();
const axios = require("axios");
const jimp = require("jimp");
const path = require("path");

router.route("/:id").get((req, res) => {
  const cardName = req.params.id.toLocaleLowerCase().trim().replace(/ /g, "+");

  // catch errors
  if (cardName.length && cardName.length < 2) {
    res.send({ msg: "Card not found." });
  }

  axios({
    method: "get",
    url: `https://api.scryfall.com/cards/named?fuzzy=${cardName
      .toLocaleLowerCase()
      .trim()
      .replace(/ /g, "+")}`,
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
        image.write(`./cards/${cardName}.jpg`, function () {
          console.log("wrote image");

          const theHerokuPath = path.join(
            __dirname,
            `../decks/${cardName}.jpg`
          );

          console.log(theHerokuPath);
          res.redirect(path.join(__dirname, `../cards/${cardName}.jpg`));
        });
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
