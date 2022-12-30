const express = require("express");
const router = express.Router();
const { messages } = require("../models");

router.post("/new", (req, res) => {
  const bodyData = req.body;
  messages.create(bodyData, (err, data) => {
    if (err) {
      console.log("error : ", err);
      res.status(500).send(err);
    } else {
      // console.log(data);
      res.status(201).send(data);
    }
  });
});

router.get("/sync", async (req, res) => {
  //   const messageList = await messages.find({});
  //   console.log(messageList);
  //   if (messageList) {
  //     res.status(200).send(messageList);
  //   } else {
  //     console.log("error occured");
  //   }
  messages
    .find({})
    .then((success) => {
      console.log(success);
      res.status(200).send(success);
    })
    .catch((err) => {
      console.log("error : ", err);
      res.status(500).send(err);
    });

  //   messages.find((err, data) => {
  //     if (err) {
  //       console.log("error : ", err);
  //       res.status(500).send(err);
  //     } else {
  //       console.log(data);
  //       res.status(201).send(data);
  //     }
  //   });
});

module.exports = router;
