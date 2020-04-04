const router = require("express").Router();
const exampleController = require("./example.controller");
const searchSingleCardController = require("./search_single_card.controller");
const builderController = require("./builder");

router.use("/api/example", exampleController);

router.use("/card", searchSingleCardController);

router.use("/builder", builderController);

module.exports = router;