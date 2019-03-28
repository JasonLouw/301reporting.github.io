var database = require('./databaseOperations.js');

var fetched;

database.fetch("ATMSS").then((items)=>{
    fetched = items;
    console.log("fetched: "+JSON.stringify(fetched, null, 2)+"-end");
});
