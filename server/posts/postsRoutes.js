const express = require("express");
const router = express.Router();
const postsController = require("./postsController");
const isAuth = require("../auth/authMiddleware").isAuth;

router.get("/", postsController.getAllPosts);
router.post("/post", isAuth, postsController.postPost);

module.exports = router;
