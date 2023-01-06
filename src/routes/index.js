const express = require("express");
const router = express.Router();
// router files
const usersListRoute = require("./usersList");
const messagesRoute = require("./messages");
const userRoute = require("./user");

const defaultRoutes = [
  {
    path: "/usersList",
    route: usersListRoute,
  },
  {
    path: "/messages",
    route: messagesRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
