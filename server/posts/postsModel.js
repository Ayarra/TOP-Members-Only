const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
  content: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostsSchema);
