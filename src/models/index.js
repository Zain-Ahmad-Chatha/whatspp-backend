// FIRST WAY

/*
module.exports.messages = require("./messages");
module.exports.users = require("./users");

*/

// SECOND WAY

const messages = require("./messages");
const UsersList = require("./UsersList");
const User = require("./User");

module.exports = {
  messages,
  UsersList,
  User,
};
