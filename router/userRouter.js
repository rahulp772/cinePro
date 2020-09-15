const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/login").post(authController.logIn);
router.route("/signup").post(authController.signup);



router.use(authController.protectedRoutes);

router.route("/logout").get(authController.logOut);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(authController.userRole('admin'), userController.updateUser)
  .delete(authController.userRole('admin'), userController.deleteUser);

  
router.use(authController.userRole('admin'));
  
router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

module.exports = router;
