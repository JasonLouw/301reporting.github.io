'use strict';
//pass: awO0xT2QFpxTRU80
const mongodb = require('mongodb');
const http = require('http');
const nconf = require('nconf');
const client = mongodb.MongoClient;

const uri = `mongodb+srv://admin:awO0xT2QFpxTRU80@cluster0-5sv23.gcp.mongodb.net/test?retryWrites=true`;

/*
if (nconf.get('mongoDatabase')) {
  uri = `${uri}/${nconf.get('mongoDatabase')}`;
}
*/
console.log(uri);

client.connect(uri,{ useNewUrlParser: true }, (err, client) => {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('connected...');
  // Create a simple little server.
  http.createServer((req, res) => {
    if (req.url === '/_ah/health') {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write('OK');
      res.end();
      return;
    }

    const collection = client.db.collection('Messages');
    var datetime = new Date();
    const msg = {
      msgDescription: '\nHello World received on ' + datetime
    };

    collection.insert(msg, (err) => {
      if (err) {
        throw err;
      }

      // push out a range
      let msglist = '';
      collection.find().toArray((err, data) => {
        if (err) {
          throw err;
        }
        data.forEach((msg) => {
          msglist += `${msg.msgDescription}; `;
        });

        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
res.write('Messages received so far:\n');
        res.end(msglist);
      });
    });
  }).listen(process.env.PORT || 1616, () => {
    console.log('started web process');
  });
});
