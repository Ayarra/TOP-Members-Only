const express = require("express");
const router = express.Router();
const postsController = require("./postsController");
const { isAuth, isAdmin } = require("../auth/authMiddleware");

router.post("/create", isAuth, postsController.createPost);
router.get("/", postsController.getAllPosts);
router.delete("/", isAuth, isAdmin, postsController.deleteAllPosts);
router.delete("/:postID", isAuth, postsController.deletePost);
router.put("/:postID", isAuth, postsController.updatePost);
module.exports = router;
