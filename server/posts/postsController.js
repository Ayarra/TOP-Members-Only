const Post = require("./postsModel");
const asyncHandler = require("express-async-handler");

exports.getAllPosts = asyncHandler(async (req, res, next) => {
  let allPosts = Post.find().sort({ createdAt: -1 });

  if (req.isAuthenticated())
    allPosts = await allPosts.populate("owner", "username").exec();
  else allPosts = await allPosts.select("-owner").exec();

  res.send(allPosts);
});

exports.createPost = asyncHandler(async (req, res, next) => {
  const content = req.body.content;
  const userID = req.user._id;

  if (!content) res.status(406).send("The post's content can't be empty.");
  const newPost = new Post({
    content: content,
    owner: userID,
  });
  await newPost.save();
  res.json({ message: "Message posted successfully" });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const postID = req.params.postID;
  const authUserID = req.user._id;

  const deletedPost = await Post.findById(postID).exec();

  if (!deletedPost) {
    return res.status(404).send("Post not found");
  }

  if (authUserID.equals(deletedPost.owner._id) || req.user.isAdmin) {
    await Post.findByIdAndDelete(postID).exec();
    return res.send(`Post ${deletedPost._id} has been deleted.`);
  } else {
    return res
      .status(401)
      .json({ msg: "You are not authorized to delete this post." });
  }
});

module.exports.deleteAllPosts = asyncHandler(async (req, res, next) => {
  const deletedPosts = await Post.deleteMany({}).exec();

  if (deletedPosts.deletedCount === 0) {
    return res.status(404).send("No posts found to delete");
  }

  res.send(`${deletedPosts.deletedCount} posts have been deleted.`);
});

module.exports.updatePost = asyncHandler(async (req, res, next) => {
  const postID = req.params.postID;
  const newContent = req.body.newContent;

  const updatedPost = await Post.findByIdAndUpdate(postID, {
    content: newContent,
  }).exec();

  if (!updatedPost) res.status(404).send("Post not found");
  res.send(`Post ${postID} has been updated.`);
});
