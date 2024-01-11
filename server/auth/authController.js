const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../users/usersModel");
const passport = require("passport");

exports.register = asyncHandler(async (req, res, next) => {
  const existingUsername = await User.findOne({
    username: req.body.username,
  }).exec();
  if (existingUsername) {
    res.status(409).send({ err: "Username taken." });
  } else {
    // Encrypting the password
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) console.error(err);
      else {
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        await user.save();
        res.send("User successfuly registred!");
      }
    });
  }
});

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    if (!user) {
      return res.status(401).send(info);
    }
    req.login(user, (errLogin) => {
      console.log(user);
      if (errLogin) return res.status(500).send("Internal Server Error");
      // else res.send("User successfuly logged in!");
      else res.send({ userID: req.user.id, username: req.user.username });
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json("Logout successful");
  });
};
