const mongoose = require("mongoose");
const { db_name } = require("../config");

// database name is after mongodb.net
const mongo_url = `mongodb+srv://root:x6jtWG5KEuSHusbZ@cluster0.3r1cx6h.mongodb.net/${db_name}?retryWrites=true&w=majority`;

const local_mongo_url = `mongodb://localhost:27017/${db_name}`;

mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("Connection Build to MongoDb");
  })
  .catch((err) => {
    console.log("Mongo DB Connection not Build.", err);
  });
