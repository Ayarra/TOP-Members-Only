const express = require("express");
const router = express.Router();
const postsController = require("./postsController");
const isAuth = require("../auth/authMiddleware").isAuth;

router.post("/create", isAuth, postsController.createPost);
router.get("/", postsController.getAllPosts);
router.delete("/", postsController.deleteAllPosts);
router.delete("/:postID", postsController.deletePost);
router.put("/:postID", postsController.updatePost);
module.exports = router;
