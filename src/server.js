// IMPORTS
const { port } = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const Pusher = require("pusher");
const morgan = require("morgan");
const cors = require("cors");

require("./db");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

const whitelist = ["http://localhost:3000", "http://localhost:4000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
// middleware
// cors policy in which origin the request is accepted.
app.use(express.json(corsOptions));
// parser data in body.
const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser);

//  for logging every request in console.
app.use(morgan("tiny"));

mongoose.set("strictQuery", true);
app.use(cors());
// CONFIG

// DB connection config

const pusher = new Pusher({
  appId: "1531072",
  key: "a79daef9a4dca38b13fe",
  secret: "519c3f6c74ac35b48b0f",
  cluster: "eu",
  useTLS: true,
});

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world",
// });

const db = mongoose.connection;

db.once("open", () => {
  console.log("connected to DB listener.");
  const messageCollection = db.collection("messages");
  const changeStream = messageCollection.watch();
  return;
  changeStream.on("change", (change) => {
    // console.log("change is working, ", change);
    if (change.operationType === "insert") {
      const insertedDoc = change.fullDocument;
      // console.log("message details :", insertedDoc);
      pusher.trigger("messages", "inserted", {
        ...insertedDoc,
      });
    } else {
      console.log("Error while triggering pusher.");
    }
  });
});

// ROUTES
app.use("/v1", routes);

app.listen(port, () => {
  console.log(`Server is listening on Port : ${port}`);
});

//  ROOT PASSWORD OF MONGO CLUSTER
// x6jtWG5KEuSHusbZ
