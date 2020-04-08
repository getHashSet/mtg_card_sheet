const router = require("express").Router();
const axios = require("axios");
const jimp = require("jimp");
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
require("dotenv").config();

// params for AWS bucket
const ID = process.env.S3_ID;
const SECRET = process.env.S3_SECRET;
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});






axios.defaults.timeout = 100000;

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
    dirtySideboard: "",
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
      theFinalDeck.deckName =
        theDeck
          .slice(+theDeck.indexOf("Deck:") + 6, +theDeck.indexOf("\n") - 4)
          .trim()
          .toLowerCase()
          .replace(/ /g, "_");
    } else {
      theFinalDeck.deckName = "untitled"; // make this random
    }

    console.log(theFinalDeck.deckName);

    theFinalDeck.dirtyCreatures = theDeck.slice(
      +theDeck.indexOf("Creatures:"),
      +theDeck.indexOf("Spells:")
    );
    theFinalDeck.dirtySpells = theDeck.slice(
      +theDeck.indexOf("Spells:"),
      +theDeck.indexOf("Lands:")
    );

    theDeck.indexOf("Sideboard:") !== -1
      ? (theFinalDeck.dirtyLands = theDeck.slice(
          +theDeck.indexOf("Lands:"),
          +theDeck.indexOf("Sideboard")
        ))
      : (theFinalDeck.dirtyLands = theDeck.slice(
          +theDeck.indexOf("Lands:"),
          +theDeck.indexOf("Created with Decked Builder")
        ));

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
                  jimps.push(jimp.read(theFinalDeck.all60Cards[q]));
                }

                Promise.all(jimps)
                  .then(function (data) {
                    return Promise.all(jimps);
                  })
                  .then(function (data) {
                    jimp.read(__dirname + "/blank.jpg").then((image) => {
                      console.log("got blank page.");

                      for (let k = 0; k < jimps.length; k++) {
                        image.quality(30);

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

                      image.quality(40);

                      image.write(`./decks/${theFinalDeck.deckName}.jpg`, function () {

                        console.log("wrote image to root");

                        const theHerokuPath = path.join(__dirname, `../decks/${theFinalDeck.deckName}.jpg`)
                        console.log(theHerokuPath);
                        
                        
                        
                        const uploadFile = (fileName) => {
                          // console.log("testing")
                          // Read content from the file
                          const fileContent = fs.readFileSync(fileName);
                          // console.log("testing")

                          // Setting up S3 upload parameters
                          const params = {
                              ACL: 'public-read',
                              Bucket: BUCKET_NAME,
                              Key: `${theFinalDeck.deckName}.jpg`, // File name you want to save as in S3
                              Body: fileContent
                          };
                          // console.log("testing")

                          // Uploading files to the bucket
                          s3.upload(params, function(err, data) {
                            
                              if (err) {
                                  throw err;
                              };

                              res.json({
                                message: "uploaded",
                                url: data.Location, // this is the URL you will find the sprite sheet at.
                              });
                              // console.log(`File uploaded successfully. ${data.Location}`);
                          });
                          // console.log("fin")

                        };
                       
                        uploadFile(theHerokuPath);

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
