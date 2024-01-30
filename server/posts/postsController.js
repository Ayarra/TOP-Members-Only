const Post = require("./postsModel");
const asyncHandler = require("express-async-handler");

exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const pageSize = 10;
  const page = parseInt(req.query.page || "0");
  const totalPosts = await Post.countDocuments({});
  let allPosts = Post.find().sort({ createdAt: -1 });

  if (req.isAuthenticated()) {
    allPosts = await allPosts
      .populate("owner", "username")
      .limit(pageSize)
      .skip(pageSize * page)
      .exec();
  } else {
    allPosts = await allPosts
      .select("-owner")
      .limit(pageSize)
      .skip(pageSize * page)
      .exec();
  }
  res.json({ totalPages: Math.ceil(totalPosts / pageSize), allPosts });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const userID = req.user._id;

  if (!content || !title)
    res.status(406).send("Both title and content should be filled.");
  else if (title.length > 50)
    res.status(422).send("Title should be less than 50 characters long.");

  const newPost = new Post({
    title: title,
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
  const authUserID = req.user._id;

  const updatedPost = await Post.findById(postID).exec();

  if (!updatedPost) {
    return res.status(404).send("Post not found");
  }

  if (authUserID.equals(updatedPost.owner._id)) {
    await Post.findByIdAndUpdate(postID, { content: newContent }).exec();
    return res.send(`Post ${postID} has been updated.`);
  } else {
    return res
      .status(401)
      .json({ msg: "You are not authorized to update this post." });
  }
});
