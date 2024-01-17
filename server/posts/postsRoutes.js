const express = require("express");
const router = express.Router();
const postsController = require("./postsController");
const isAuth = require("../auth/authMiddleware").isAuth;

router.get("/", postsController.getAllPosts);
router.post("/create", isAuth, postsController.createPost);

router.get("/:username", postsController.getUserPosts);

module.exports = router;
