const express = require("express");
const router = express.Router();
const { User } = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/interactedUser", async (req, res) => {
  console.log("calling interacted userss : ", req.body);
  //   return;
  if (
    Object.keys(req.body.data).length === 0 ||
    !Object.values(req.body.data).every((row) => row)
  ) {
    return res.status(500).json({
      error: {
        message: "body include null aur empty string or body is empty",
        body: req.body,
      },
    });
  }

  const { data } = req.body;
  const { id } = req.body;

  let newUser = {
    userId: id,
    interactedUsers: [data],
  };

  //   return User.create(
  //     {},
  //     {
  //       $push: { interactedUsers: data },
  //     },
  //     { new: true }

  return User.create(newUser)
    .then(async (products) => {
      console.log("then case", products);
      if (!!products.interactedUsers && products.interactedUsers.length > 0) {
        return res.status(200).json({
          success: true,
          data: {
            products: products.interactedUsers,
          },
        });
      } else {
        return res.status(200).json({
          success: true,
          data: {
            message: "No Record Found!",
            reason: "",
          },
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: {
          message: "Database Error!",
          reason: err.message,
        },
      });
    });
});

module.exports = router;
