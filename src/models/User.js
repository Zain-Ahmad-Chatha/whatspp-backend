const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const UserSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    default: null,
  },
  interactedUsers: {
    type: [
      {
        type: Object,
        default: null,
      },
    ],
    default: [],
  },
  chat: {
    type: [
      {
        senderID: {
          type: ObjectId,
        },
        receiverID: {
          type: ObjectId,
        },
        time: {
          type: Date,
          default: new Date(),
        },
        message: {
          type: String,
          default: null,
        },
      },
    ],
    default: [],
  },
  // _id: false,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
