const router = require("express").Router();
const axios = require("axios");

// Create
router.route("/").post((req, res) => {
  console.log("route hit");
  console.log(req.body.deck);

  let singleCard = req.body.cardName ? req.body.cardName : null;
  let theDeck = req.body.deck ? req.body.deck : null;

  if (singleCard !== null && theDeck === null) {
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
      : res.send({ message: "No card found" });
  } else if (theDeck !== null) {
    res.json({return: req.body.deck})
  } else {
    res.json({message: "Unable to Build Deck."})
  };
  res.json({message: "Unable to Build Deck."});
});

router.route("/").get((req, res) => {
  res.send("This is a POST route");
});

module.exports = router;
