const Post = require("./postsModel");
const asyncHandler = require("express-async-handler");

exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find()
    .populate("owner", "username _id")
    .sort({ createdAt: -1 })
    .exec();
  res.send(allPosts);
});

exports.postPost = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const newPost = new Post({
    content: req.body.content,
    owner: req.user._id,
  });
  await newPost.save();
  res.json({ message: "Message posted successfully" });
});
