const router = require("express").Router();
const axios = require("axios");
const jimp = require("jimp");

// Create
router.route("/").post((req, res) => {
  // console.log(req.body.deck);

  let singleCard = req.body.cardName ? req.body.cardName : null;
  let theDeck = req.body.deck ? req.body.deck : null;
  let theFinalDeck = {
    deckName: "",
    dirtyCreatures: "",
    dirtySpells: "",
    dirtyLands: "",
    creatures: [],
    spells: [],
    lands: [],
    final_creatures: [],
    final_spells: [],
    final_lands: [],
    all60Cards: [],
  };

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
    if (theDeck.indexOf("Deck:") !== -1) {
      theFinalDeck.deckName = theDeck.slice(
        +theDeck.indexOf("Deck:") + 6,
        +theDeck.indexOf("\n") - 4
      );
    } else {
      theFinalDeck.deckName = "Untitled Deck";
    }

    theFinalDeck.dirtyCreatures = theDeck.slice(
      +theDeck.indexOf("Creatures:"),
      +theDeck.indexOf("Spells:")
    );
    theFinalDeck.dirtySpells = theDeck.slice(
      +theDeck.indexOf("Spells:"),
      +theDeck.indexOf("Lands:")
    );
    theFinalDeck.dirtyLands = theDeck.slice(
      +theDeck.indexOf("Lands:"),
      +theDeck.indexOf("Created with Decked Builder")
    );

    function pushToArray(str, key) {
      str = str.slice(+str.indexOf("\n"));
      theFinalDeck[key] = str.split("\n").filter((item) => item); // filter will remove "" values.
      theFinalDeck[key].forEach((arrayItem) => {
        let newObj = { name: "", prettyName: "", number: undefined };
        newObj.number = +arrayItem.slice(0, 1);
        newObj.prettyName = arrayItem.slice(1);
        newObj.image = "";
        newObj.name = newObj.prettyName
          .slice(1)
          .trim()
          .replace(/ /g, "+")
          .toLowerCase();
        theFinalDeck[`final_${key}`].push(newObj);
      });
    }

    pushToArray(theFinalDeck.dirtyCreatures, "creatures");
    pushToArray(theFinalDeck.dirtySpells, "spells");
    pushToArray(theFinalDeck.dirtyLands, "lands");

    for (let i = 0; i < theFinalDeck.final_creatures.length; i++) {
      apiCall(
        theFinalDeck.final_creatures[i].name,
        i,
        "final_creatures",
        theFinalDeck.final_creatures[i].number
      );
    }

    for (let i = 0; i < theFinalDeck.final_spells.length; i++) {
      apiCall(
        theFinalDeck.final_spells[i].name,
        i,
        "final_spells",
        theFinalDeck.final_spells[i].number
      );
    }

    for (let i = 0; i < theFinalDeck.final_lands.length; i++) {
      apiCall(
        theFinalDeck.final_lands[i].name,
        i,
        "final_lands",
        theFinalDeck.final_lands[i].number
      );
    }

    setTimeout(() => { ////// this should really be a promise all
      /////////
      // JIMP
      /////////

      let cardWidth = 488;
      let cardHeight = 680;
      let row = 0;
      let col = 0;
      let jimps = [];

      for (let q = 0; q < theFinalDeck.all60Cards.length; q++) {
        jimps.push(jimp.read(theFinalDeck.all60Cards[q]));
      }

      Promise.all(jimps)
        .then(function (data) {
          return Promise.all(jimps);
        })
        .then(function (data) {
          jimp.read(__dirname + "/blank.jpg").then((image) => {

            for (k = 0; k < jimps.length; k++) {
              image.composite(data[k], (row * cardWidth), (col * cardHeight));
              if (row === 9) {
                row = 0
                col++
              } else {
                row++
              };
            };

            let cleanDeckName = theFinalDeck.deckName.trim().toLowerCase().replace(/ /g, "_");

            image.quality(60);

            image.write(`./decks/${cleanDeckName}.jpg`, function () {
              console.log("wrote image to root");
              res.json(theFinalDeck);
            });
          });
        });
    }, 15000);

    function apiCall(name, i, key, numberOfCards) {
      axios({
        method: "GET",
        url: `https://api.scryfall.com/cards/named?fuzzy=${name}`,
      })
        .then((scryfallData) => {
          let cardURL = scryfallData.data.image_uris.normal;

          for (let j = 0; j < numberOfCards; j++) {
            theFinalDeck["all60Cards"].push(cardURL);
          }

          theFinalDeck[key][i].image = cardURL;
        })
        .catch((err) => {
          console.log("error");
        });
    }
  } else {
    res.json({ error: "Unable to Build Deck.", message: null });
  }
});

router.route("/").get((req, res) => {
  res.send("This is a POST route");
});

module.exports = router;
