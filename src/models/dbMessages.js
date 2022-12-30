const mongoose = require("mongoose");

const messageContentSchema = mongoose.Schema({
  message: String,
  name: String,
  timeStamp: {
    type: Date,
    default: new Date(),
  },
  received: Boolean,
});

const messages = mongoose.model("messages", messageContentSchema);

module.exports = messages;
