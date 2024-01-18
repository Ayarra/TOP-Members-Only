const express = require("express");
const router = express.Router();
const usersController = require("./usersController");
const { isAuth, isAdmin } = require("../auth/authMiddleware");

router.get("/", isAuth, usersController.getAllUsers);
router.get("/:userID", isAuth, usersController.getUser);
router.put("/:userID/admin", isAuth, usersController.makeAdmin);
router.put("/:userID/password", isAuth, usersController.updateUserPassword);
router.delete("/", isAuth, isAdmin, usersController.deleteAllUsers);
router.delete("/:userID", isAuth, usersController.deleteUser);
module.exports = router;
