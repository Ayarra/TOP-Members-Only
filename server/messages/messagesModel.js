const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
  content: String,
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  owner: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessagesSchema);
