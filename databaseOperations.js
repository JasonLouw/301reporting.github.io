/*
  Database operations
  ============================
  1. Insert (subsystem, data)
    -> Inserts a JSON array of records into the required database

  2. Fetch (subsystem)
    -> Returns a JSON array containing all of the records in a given collection
*/

dbase = require('./dbase.js');

module.exports ={
  insert: function(subsystem, data){
    let database = null;

    dbase.open().then((client)=>{
      console.log("connected, looking for subsystem: " + subsystem);
      database = client;
      return client.db("301Reporting").collection(subsystem)
    })
    .then((collection) => {
      console.log("attempting to insert: " + data);
      return collection.insertMany(data)
    })
    .then((result) =>{
      console.log(result);
      database.close();
    })
    .catch((err)=>{
      console.error(err);
    })
  },

  fetch: function(subsystem){
    let database = null;

    return dbase.open().then((client) =>{
      database = client;
      return client.db("301Reporting").collection(subsystem)

    }).
    then((collection) => {
      return collection.find().sort({timeStamp : 1}).toArray();
    })
    .then((items) =>{
      output = items;
      database.close();
      return output;
    }).catch((err) =>{
      console.error(err);
    });

  },

  purge: function(subsystem){
    let database = null;

    return dbase.open().then((client) =>{
      database = client;
      return client.db("301Reporting").collection(subsystem)

    }).
    then((collection) => {
      return collection.deleteMany({});
    })
    .then((result) =>{
      output = result;
      database.close();
      return output;
    }).catch((err) =>{
      console.error(err);
    });

  }

};
