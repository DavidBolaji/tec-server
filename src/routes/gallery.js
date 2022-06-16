const express = require('express');
const router = new express.Router();
const galleryController = require('../controller/galleryController');
const upload = require("../utils/multer");
const auth = require("../middleware/auth");
const catchAsyncError = require("../utils/error");

router.post(
    "/api/v1/gallery",
    auth,
    upload.single("images"),
    galleryController.store,
    catchAsyncError
  );

  router.get(
    "/api/v1/gallery",
    galleryController.getAll,
  );

module.exports = router;