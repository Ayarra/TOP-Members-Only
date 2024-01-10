const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../users/usersModel");
const bcrypt = require("bcryptjs");

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return done(null, false, { message: "Incorrect username!" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password!" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// to re-read https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5
