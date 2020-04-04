const router = require("express").Router();
const exampleController = require("./example.controller");
const searchSingleCardController = require("./search_single_card.controller");
const testController = require('./test.controller');

// router.use("/api/example", exampleController);

router.use("/card", searchSingleCardController);

router.use("/test", testController);

module.exports = router;