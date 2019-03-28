const MongoClient = require(‘mongodb’).MongoClient;
const uri = "mongodb+srv://admin:awO0xT2QFpxTRU80@cluster0-5sv23.gcp.mongodb.net/mongoDatabase?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("mongoDatabase").collection("messages");
  // perform actions on the collection object
  client.close();
});

database.purge("Status").then((outcome)=>{
  console.log("outcome: " + JSON.stringify(outcome, null, 2));
});
