const express = require("express");
const viewController = require("../controllers/viewsController");

const router = express.Router();

router.get("/", viewController.getHomePage);
router.get("/:slug", viewController.getOneMovie);

module.exports = router;
