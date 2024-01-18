const User = require("../users/usersModel");
const Post = require("../posts/postsModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

module.exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const result = await User.find({}, "username isAdmin")
    .sort({ username: -1 })
    .exec();
  res.send(result);
});

module.exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userID, "username").exec();
  if (!user) res.status(404).send("User not found");

  const posts = await Post.find(
    { owner: user._id },
    "content createdAt"
  ).exec();
  res.send({ user, posts });
});

module.exports.makeAdmin = asyncHandler(async (req, res, next) => {
  const adminPassword =
    "kjhgkljsdhdfgskl.jjklbjkhbldgflkjhgdfsklhjjklhjlhgdfsjklhgfdksljk";
  const userID = req.params.userID;
  const userAdminPassword = req.body.adminPassword;

  const user = await User.findById(userID, "username").exec();
  if (userAdminPassword === adminPassword) {
    user.isAdmin = true;
    await user.save();
    res.send(`${user.username} is an admin now.`);
  } else res.status(401).send("Wrong password.");
});

module.exports.updateUserPassword = asyncHandler(async (req, res, next) => {
  const newPassword = req.body.newPassword;
  const userID = req.params.userID;

  const user = await User.findById(userID).exec();
  if (!user) res.status(404).send("User not found");

  const matchingPassword = await bcrypt.compare(newPassword, user.password);
  if (matchingPassword) {
    return res
      .status(400)
      .send("New password must be different from the old password");
  } else {
    bcrypt.hash(newPassword, 10, async (err, hashedPassword) => {
      if (err) console.error(err);
      else {
        user.password = hashedPassword;

        await user.save();
        res.json("Password updated successfully");
      }
    });
  }
});

module.exports.deleteAllUsers = asyncHandler(async (req, res, next) => {
  const deletedUsers = await User.deleteMany({}).exec();

  if (deletedUsers.deletedCount === 0) {
    return res.status(404).send("No users found to delete");
  }

  res.send(`${deletedUsers.deletedCount} users have been deleted.`);
});

module.exports.deleteUser = asyncHandler(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.userID)
    .select("username")
    .exec();
  if (!deletedUser) res.status(404).send("User not found");
  else res.send(`User ${deletedUser.username} has been deleted.`);
});
