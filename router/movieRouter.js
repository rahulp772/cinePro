const express = require("express");
const movieController = require("../controllers/movieController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(movieController.getAllMovies)
  .post(authController.protectedRoutes, movieController.addMovie);

router.use(authController.protectedRoutes);
router
  .route("/:id")
  .get(movieController.getMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
