const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const dbConnect = require("./config/database");
require("./config/passport");

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
  session({ secret: "membersOnly", resave: false, saveUninitialized: true })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//  Routes Setup
const authRoutes = require("./auth/authRoutes");
const postsRoutes = require("./posts/postsRoutes");
const usersRoutes = require("./users/usersRoutes");

const isAuth = require("./auth/authMiddleware").isAuth;

app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);

app.use("/error", (req, res) => {
  res.send("Error page");
});
app.use("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
