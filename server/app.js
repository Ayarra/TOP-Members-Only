const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const passport = require("passport");
const flash = require("connect-flash");
require("dotenv").config();
require("./config/passport");
const dbConnect = require("./config/database");

// Creating express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connection to the DB
dbConnect();

// Passport Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//  Routes Setup
const authRoutes = require("./auth/authRoutes");
const postsRoutes = require("./posts/postsRoutes");
const usersRoutes = require("./users/usersRoutes");

app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);

app.use("/error", (req, res) => {
  res.send("Error page");
});
app.use("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
