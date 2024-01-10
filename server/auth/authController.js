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
        res.redirect("/");
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
      else res.redirect("/");
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  console.log("logged out");
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json("Logout successful");
  });
};
