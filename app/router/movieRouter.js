const express = require("express");
const movieController = require("../controllers/movieController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(movieController.getAllMovies)
  .post(
    authController.userRole("admin"),
    authController.protectedRoutes,
    movieController.addMovie
  );

router.use(authController.protectedRoutes);
router
  .route("/:id")
  .get(movieController.getMovie)
  .patch(authController.userRole("admin"), movieController.updateMovie)
  .delete(authController.userRole("admin"), movieController.deleteMovie);

module.exports = router;
