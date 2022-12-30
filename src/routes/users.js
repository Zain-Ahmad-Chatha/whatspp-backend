const express = require("express");
const router = express.Router();
const { users } = require("../models");

router.post("/", (req, res) => {
  const userDetails = req.body;
  console.log(userDetails.formValues);
  //   users.create(userDetails, (err, data) => {
  //     if (err) {
  //       console.log("Error Occured:", err);
  //       res.status(400).send("Some Error Occured");
  //     } else {
  //       res.status(201).json(data);
  //     }
  //   });

  users.create(userDetails.formValues, (err, data) => {
    if (err) {
      // console.log("error : ", err);
      res.status(500).send(err);
    } else {
      // console.log(data);
      res.status(201).send(data);
    }
  });
});

router.get("/", async (req, res) => {
  users
    .find({})
    .then((success) => {
      console.log(success);
      res.status(200).send(success);
    })
    .catch((err) => {
      console.log("error : ", err);
      res.status(500).send(err);
    });
});

router.get("/:username/:password", async (req, res) => {
  const { username, password } = req.params;
  users
    .find({ username: username, password: password })
    .then((success) => {
      console.log(success);
      res.status(200).send(success);
    })
    .catch((err) => {
      console.log("error : ", err);
      res.status(500).send(err);
    });
});

module.exports = router;
