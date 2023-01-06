const mongoose = require("mongoose");
const UsersListSchema = new mongoose.Schema({
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
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

const UsersList = mongoose.model("UsersList", UsersListSchema);

module.exports = UsersList;
