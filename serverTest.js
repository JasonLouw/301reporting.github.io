const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://admin:awO0xT2QFpxTRU80@cluster0-5sv23.gcp.mongodb.net/test?retryWrites=true";

MongoClient.connect(uri,{useNewUrlParser: true}, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }

    console.log('Connected...');
     const collection = client.db("test").collection("devices");

     // perform actions on the collection object
     var insObj =  {message : "tally ho!"};

     collection.insertOne(insObj, function (err, res){
       if (err) {
         console.log('We have enountered some kind of error:\n'+err);
       }
       else {
         console.log('object inserted!');
       }
     });
   
   client.close();
});
