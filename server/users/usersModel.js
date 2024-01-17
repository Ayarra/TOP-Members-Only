const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxLength: 100,
  },
  password: {
    type: String,
    required: true,
    mingLength: 8,
  },
  isAdmin: { type: Boolean, default: false },
});

UsersSchema.virtual("url").get(function () {
  return `${this.id}`;
});

module.exports = mongoose.model("User", UsersSchema);
