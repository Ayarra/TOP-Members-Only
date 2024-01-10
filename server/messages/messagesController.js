const Message = require("./messagesModel");
const asyncHandler = require("express-async-handler");

exports.getAllMessages = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find().sort({ createdAt: -1 }).exec();
  res.send(allMessages);
});

exports.postMessage = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const newMessage = new Message({
    content: req.body.content,
    owner: req.body.owner,
  });
  await newMessage.save();
  res.json({ message: "Message posted successfully" });
});
