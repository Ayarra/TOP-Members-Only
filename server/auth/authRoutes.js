const express = require("express");
const router = express.Router();
const authController = require("./authController");
const { validateRegistration } = require("./authMiddleware");
const { body } = require("express-validator");

router.post("/register", validateRegistration, authController.register);
router.post("/login", authController.login);
router.get("/check-session", authController.checkSession);
router.get("/logout", authController.logout);

module.exports = router;
