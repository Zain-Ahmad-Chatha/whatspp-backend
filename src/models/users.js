const mongoose = require("mongoose");
const usersSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pictureLink: {
    type: String,
    required: true,
  },
});

const users = mongoose.model("users", usersSchema);

module.exports = users;
