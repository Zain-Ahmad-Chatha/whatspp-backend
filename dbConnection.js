const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://root:x6jtWG5KEuSHusbZ@cluster0.3r1cx6h.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
