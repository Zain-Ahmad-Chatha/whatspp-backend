const jwt = require("jsonwebtoken");
const { private_secret_key } = require("../config");

const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("auth header ", token);
  if (!token) return res.status(401).send("Token not found. Un-Authorized.");

  jwt.verify(token, private_secret_key, (err, payload) => {
    if (err)
      return res.status(403).send("Token Does not match. Un-Authorized.");
    req.payload = payload;
    next();
  });
};

module.exports = auth;
