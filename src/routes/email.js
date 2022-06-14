const express = require('express');
const router = new express.Router();
const emailController = require('../controller/emailController');

router.post(
    "/api/v1/email/subscribe",
    emailController.subscribe
  );


module.exports = router;