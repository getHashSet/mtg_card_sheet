const router = require("express").Router();
const axios = require("axios");

// Create
router.route("/").post((req, res) => {
  console.log('route hit')
  console.log(req.body);

  let singleCard = req.body.cardName ? req.body.cardName : null;

  singleCard != null
    ? axios({
        method: "get",
        url: `https://api.scryfall.com/cards/named?fuzzy=${singleCard
          .toLowerCase()
          .trim()
          .replace(/ /g, "+")}`,
      })
        .then((scryfallData) => {
          res.send(scryfallData.data.image_uris.normal);
        })
        .catch((err) => {
          console.log("error");
          alert("No card found.");
        })
    : res.send({message: "No card found"});
});

router.route("/").get((req, res) => {
  console.log("got a get request")
  res.send("you hit the wrong route")
});

module.exports = router;
