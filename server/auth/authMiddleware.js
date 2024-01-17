const { body } = require("express-validator");

module.exports.validateRegistration = [
  body("username")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must include at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must include at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must include at least one digit")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must include at least one special character"),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("Passwords don't match");
    else return value;
  }),
];

module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource." });
};

// module.exports.isAdmin = (req, res, next) => {
//   if (req.isAuthenticated() && req.user.admin) next();
//   else
//     res
//       .status(401)
//       .json({ msg: "You need to be an Admin to view this resource." });
// };
