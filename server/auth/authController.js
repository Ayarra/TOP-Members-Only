const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../users/usersModel");
const passport = require("passport");
const { validationResult } = require("express-validator");

exports.register = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }

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
      if (errLogin) return res.status(500).send("Internal Server Error");
      else res.send({ userID: req.user.id, username: req.user.username });
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  // Check if the user is already logged out
  if (!req.isAuthenticated()) {
    return res.status(401).json("User is already logged out");
  }

  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json("Logout successful");
  });
};
