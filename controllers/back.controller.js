const router = require("express").Router();
const path = require("path");

router.route("/:id").get((req, res) => {
  let imageName =
    req.params.id !== "" || req.params.id !== null || req.params.id !== undefined
      ? req.params.id.toLowerCase()
      : "classic";

  res.sendFile(path.join(__dirname, `../backs/${imageName}.jpg`));
});

router.route("/").get((req, res) => {
  res.sendFile(path.join(__dirname, "../backs/classic.jpg"));
});

module.exports = router;
