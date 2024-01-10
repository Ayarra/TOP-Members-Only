const express = require("express");
const router = express.Router();
const authController = require("./authController");
const isAuth = require("./authMiddleware").isAuth;

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
