const express = require("express");
const commController = require("../controllers/commentController");

const router = express.Router();

router.route("/").post(commController.createComment);
router.route("/:id").get(commController.getComment).delete(commController.deleteComment);

module.exports = router;