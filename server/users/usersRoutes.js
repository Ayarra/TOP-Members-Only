const express = require("express");
const router = express.Router();
const usersController = require("./usersController");

router.get("/", usersController.getAllUsers);
router.get("/:userID", usersController.getUser);
router.put("/userID/admin", usersController.makeAdmin);
router.put("/:userID/password", usersController.updateUserPassword);
router.delete("/", usersController.deleteAllUsers);
router.delete("/:userID", usersController.deleteUser);
module.exports = router;
