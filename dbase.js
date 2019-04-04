'use strict';

var MongoClient = require('mongodb').MongoClient;
var Promise = require('rsvp').Promise;
var uri = "mongodb://admin:awO0xT2QFpxTRU80@cluster0-shard-00-00-5sv23.gcp.mongodb.net:27017,cluster0-shard-00-01-5sv23.gcp.mongodb.net:27017,cluster0-shard-00-02-5sv23.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

function open(){
  let url = uri;

  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) =>{
      if (err){
        reject(err);
      } else {
        resolve(client);
      }
    })
  });
}

function close(client){
  if (client){
    client.close();
  }
}

let dbase = {
  open : open,
  close : close
}

module.exports = dbase;
