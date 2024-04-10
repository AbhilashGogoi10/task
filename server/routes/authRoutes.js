const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/authControllers");


// Register Route
router.post("/user/register",controllers.userregister);

// Send Otp Route
router.post("/user/sendotp",controllers.userOtpSend);

// Login Route
router.post("/user/login",controllers.userLogin);








module.exports = router;