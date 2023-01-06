const express = require("express");
const router = express.Router();
// for generating hashing password.
const bcrypt = require("bcrypt");
const { UsersList } = require("../models");
const { hash_salt, private_secret_key } = require("../config");
const { auth } = require("../middleware");
const jwt = require("jsonwebtoken");
// register a user.
router.post("/", async (req, res) => {
  let { formValues } = req.body;
  console.log("ssss", formValues);
  //   UsersList.create(formValues, (err, data) => {
  //     if (err) {
  //       console.log("Error Occured:", err);
  //       res.status(400).send("Some Error Occured");
  //     } else {
  //       res.status(201).json(data);
  //     }
  //   });

  try {
    /* we have to generate salt bcz if every person use the same password it will be hashed as same. but with salt it will not generate same pass
    if the incoming password is same.
    */
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(formValues.password, 10);
    // return;
    formValues = { ...formValues, password: hashedPassword };
    UsersList.create(formValues, (err, data) => {
      console.log("err : ", err, " data:", data);
      if (err) {
        res.status(500).send({
          status: false,
          code: err.code,
          reason: "Duplicate Username.",
          error: err,
        });
      } else {
        res.status(201).send({ status: true, data: data });
      }
    });
  } catch (err) {
    console.log("Erro while creating hash and adding new user.", err);
    res.status(500).send({ status: false, reason: "Internal Error Occured." });
  }
});

// get all UsersList ,
router.get("/", auth, async (req, res) => {
  UsersList.find({})
    .then((success) => {
      // console.log(success);
      success = success.map((obj) => {
        return {
          id: obj._id,
          firstName: obj.firstName,
          lastName: obj.lastName,
          password: obj.password,
          picture: obj.pictureLink,
          lastMessage: "Pending...",
        };
      });
      res.status(200).send(success);
    })
    .catch((err) => {
      console.log("error : ", err);
      res.status(500).send(err);
    });
});

// login
router.get("/:username/:password", async (req, res) => {
  const { username, password } = req.params;
  console.log("username: ", username, " pass:", password);
  const response = await UsersList.find({ username: username });
  if (response.length <= 0) {
    res
      .status(400)
      .send({ status: false, found: false, reason: "User Not Found" });
  } else {
    try {
      console.log("response : ", response);
      const result = await bcrypt.compare(password, response[0].password);
      if (result) {
        // here the login credentials are correct so have to generate a token.
        const access_token = jwt.sign(username, private_secret_key);
        res.status(200).send({
          status: true,
          found: true,
          data: response.map((obj) => {
            return {
              id: obj._id,
              name: obj.firstName + " " + obj.lastName,
              picture: obj.picture,
              lastMessage: "No Work",
            };
          }),
          access_token: access_token,
        });
      } else {
        res.status(500).send({
          status: false,
          found: true,
          reason: "Password did not match.",
        });
      }
    } catch {
      res.status(500).send("server error");
    }
  }

  return;
  UsersList.find({ username: username })
    .then((success) => {
      console.log(success.length);
      if (success.length <= 0) {
        res
          .status(400)
          .send({ status: false, found: false, reason: "User Not Found" });
      } else {
        try {
          const result = bcrypt.compare(password, success.password);
          console.log("result ", result);
          res.status(200).send(success);
        } catch {
          res.status(500).send(null);
        }
      }
    })
    .catch((err) => {
      console.log("error : ", err);
      res.status(500).send(err);
    });
});

module.exports = router;
