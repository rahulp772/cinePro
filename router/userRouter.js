const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/login").post(authController.logIn);
router.route("/signup").post(authController.signup);

router.use(authController.protectedRoutes);
router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

router.route("/logout").get(authController.logOut);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
