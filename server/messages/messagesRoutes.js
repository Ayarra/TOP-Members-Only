const express = require("express");
const router = express.Router();
const messagesController = require("./messagesController");
const isAuth = require("../auth/authMiddelware").isAuth;

router.get("/", messagesController.getAllMessages);
router.post("/post", isAuth, messagesController.postMessage);

module.exports = router;
