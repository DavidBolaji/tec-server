const express = require("express");
const router = new express.Router();
const { cloudinary } = require("../utils/cloudinary");
const userController = require("../controller/userController");
const upload = require("../utils/multer");
const catchAsyncError = require("../utils/error");
const auth = require("../middleware/auth");

// await cloudinary.uploader.upload(str, {})
router.post(
  "/api/v1/user/register",
  upload.single("images"),
  userController.register,
  catchAsyncError
);
router.post(
  "/api/v1/user/update",
  upload.single("images"),
  auth,
  userController.update,
  catchAsyncError
);
router.get("/api/v1/user/find/tutors", userController.getTutors);
router.delete("/api/v1/user/delete/:userId", auth, userController.deleteUser);
router.patch(
  "/api/v1/user/activate",
  auth,
  userController.setUserActiveOrInactive
);
router.get("/api/v1/user/find/:id", auth, userController.getUser);
router.post("/api/v1/user/login", userController.login);
router.post("/api/v1/user/logout", auth, userController.logout);

module.exports = router;
