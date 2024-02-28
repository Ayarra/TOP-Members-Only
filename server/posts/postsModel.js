const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
  title: { type: String, required: true, maxLength: 50 },
  content: { type: String, required: true, maxLength: 1000 },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostsSchema);
