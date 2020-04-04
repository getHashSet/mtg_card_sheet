const mongoose = require("mongoose");
// const db = require("../../models");
// let seed_imgs = require ("./seed_img")
// let seed_portfolio = require ('./seed_portfolio');
// let seed_partners = require ('./seed_partner');
// let seed_homepage = require ('./seed_homepage');

// This file empties the collections

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/projectthree"
);

////////////
// delete and seed database.
////////////

// get ready for all them callbacks! One callback per component that uses a collection.

// db.Portfolio
// .remove({})
// .then(() => db.Portfolio.collection.insertMany(seed_portfolio))
// .then(data => {
//    console.log(data.result.n + " portfolio content seeded.");

//   db.Partners
//   .remove({})
//   .then(() => db.Partners.collection.insertMany(seed_partners))
//   .then(data => {
//      console.log(data.result.n + " partners seeded.");

//     db.Images
//     .remove({})
//     .then(() => db.Images.collection.insertMany(seed_imgs))
//     .then(data => {
//        console.log(data.result.n + " images seeded.")
      
//       db.Homepage
//       .remove({})
//       .then(() => db.Homepage.collection.insertMany(seed_homepage))
//       .then(data => {
//          console.log(data.result.n + " home page items seeded.")
//         process.exit(0);
//       });
//     });
//   });
// })
// .catch(err => {
//  console.error(err);
//   process.exit(1);
// });