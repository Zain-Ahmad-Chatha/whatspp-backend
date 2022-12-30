const express = require("express");
const router = express.Router();
// router files
const usersRoute = require("./users");
const messagesRoute = require("./messages");

const defaultRoutes = [
  {
    path: "/users",
    route: usersRoute,
  },
  {
    path: "/messages",
    route: messagesRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
