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
        newObj.number = +arrayItem.slice(0, +arrayItem.indexOf(" "));
        newObj.prettyName = arrayItem.slice(+arrayItem.indexOf(" "));
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

    // this is every card object in the deck. Now we make our axios call.

    const everyCreatureCard = theFinalDeck.final_creatures.map((cardObj) => {
      return axios({
        method: "GET",
        url: `https://api.scryfall.com/cards/named?fuzzy=${cardObj.name}`,
      })
        .then((scryfallData) => {
          const cardURL = scryfallData.data.image_uris.normal;

          for (let j = 0; j < cardObj.number; j++) {
            theFinalDeck["all60Cards"].push(cardURL);
          }

          cardObj.image = cardURL;
        })
        .catch((err) => {
          console.error(err);
        });
    });

    Promise.all(everyCreatureCard)
      .then(function (data) {
        return Promise.all(everyCreatureCard);
      })
      .then(function (data) {
        /////// spells ///////////
        const everySpellCard = theFinalDeck.final_spells.map((cardObj) => {
          return axios({
            method: "GET",
            url: `https://api.scryfall.com/cards/named?fuzzy=${cardObj.name}`,
          })
            .then((scryfallData) => {
              const cardURL = scryfallData.data.image_uris.normal;

              for (let j = 0; j < cardObj.number; j++) {
                theFinalDeck["all60Cards"].push(cardURL);
              }

              cardObj.image = cardURL;
            })
            .catch((err) => {
              console.error(err);
            });
        });

        Promise.all(everySpellCard)
          .then(function (data) {
            return Promise.all(everySpellCard);
          })
          .then(function (data) {
            ///////// lands ////////
            const everyLandCard = theFinalDeck.final_lands.map((cardObj) => {
              return axios({
                method: "GET",
                url: `https://api.scryfall.com/cards/named?fuzzy=${cardObj.name}`,
              })
                .then((scryfallData) => {
                  const cardURL = scryfallData.data.image_uris.normal;

                  for (let j = 0; j < cardObj.number; j++) {
                    theFinalDeck["all60Cards"].push(cardURL);
                  }

                  cardObj.image = cardURL;
                })
                .catch((err) => {
                  console.error(err);
                });
            });

            Promise.all(everyLandCard)
              .then(function (data) {
                return Promise.all(everyLandCard);
              })

              //////// jimp /////////////
              .then(function (data) {
                console.log("jimp started.");
                // /////////
                // // JIMP
                // /////////

                let cardWidth = 488;
                let cardHeight = 680;
                let row = 0;
                let col = 0;
                let jimps = [];
                let totalJimps = 0;
                console.log(
                  `total cards to stick: ${theFinalDeck.all60Cards.length}`
                );
                let totalCallbacks = theFinalDeck.all60Cards.length;

                for (let q = 0; q < totalCallbacks; q++) {
                  totalJimps++;
                  console.log(`total images jimped: ${totalJimps}`);
                  jimps.push(jimp.read(theFinalDeck.all60Cards[q]));
                }

                Promise.all(jimps)
                  .then(function (data) {
                    console.log("jimp promise");
                    return Promise.all(jimps);
                  })
                  .then(function (data) {
                    console.log("sticking images to blank.jpg");
                    jimp.read(__dirname + "/blank.jpg").then((image) => {
                      console.log('got blank page.');
                      
                      for (let k = 0; k < jimps.length; k++) {
                        image.quality(50);

                        image.composite(
                          data[k],
                          row * cardWidth,
                          col * cardHeight
                        );
                        if (row === 9) {
                          row = 0;
                          col++;
                        } else {
                          row++;
                        }
                      }

                      let cleanDeckName = theFinalDeck.deckName
                        .trim()
                        .toLowerCase()
                        .replace(/ /g, "_");

                      image.quality(50);

                      image.write(`./decks/${cleanDeckName}.jpg`, function () {
                        console.log("wrote image to root");
                        res.json(theFinalDeck);
                      });
                    });
                  });
              });
          });
      });
  } else {
    res.json({ error: "Unable to Build Deck.", message: null });
  }
});

router.route("/").get((req, res) => {
  res.send("This is a POST route");
});

module.exports = router;
