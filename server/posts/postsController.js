const Post = require("./postsModel");
const asyncHandler = require("express-async-handler");

exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find()
    .populate("owner", "username")
    .sort({ createdAt: -1 })
    .exec();
  res.send(allPosts);
});

// exports.getUserPosts = asyncHandler(async (req, res, next) => {
//   const allUserPosts = await Post.find({})
//     .populate("owner.username")
//     .sort({ createdAt: -1 })
//     .exec();

//   res.send(allUserPosts);
// });

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

  const deletedPost = await Post.findByIdAndDelete(postID).exec();
  if (!deletedPost) res.status(404).send("Post not found");
  else res.send(`Post ${deletedPost._id} has been deleted.`);
});

module.exports.deleteAllPosts = asyncHandler(async (req, res, next) => {
  const deletedPosts = await Post.deleteMany({}).exec();

  if (deletedPosts.deletedCount === 0) {
    return res.status(404).send("No posts found to delete");
  }

  res.send(`${deletedPosts.deletedCount} posts have been deleted.`);
});
