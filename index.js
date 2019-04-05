//nodemon to automatically restart server on changes
var express = require('express');
//var mongo = require('mongodb').MongoClient;
var cors = require('cors');
//var $ = require('jQuery');
var app = express();
var database = require('./databaseOperations.js');



var bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/*view engine setup
    app.set must come after all dependencies and constants defined
    and before the first use of app.use
*/
app.set('views', 'views');
app.set('view engine', 'pug');

/*  
    im assuming this includes the folder your wana use
    so that you have to always type out the full file
    paths or something 
*/

    app.use(express.static('frontEnd'));
    app.use(express.static('testPost'));
   
     //Write databse Insert/Update/Query code here..
                

    app.get('/', function (req, res) {//front end
        res.sendfile('/index.html');
        res.end();
    });

    app.get('/purge',function(req, res)
    {
        if(req.query.system !== undefined)
        {
            console.log("purge");
            console.log(req.query.system)
            database.purge(req.query.system).then((items)=>{
                    console.log("purged");
                });
            res.write('{"Status":"purginged subystem"}');
        }
        res.end();
    });

    app.get('/purgeall',function(req, res)
    {
        
                database.purge("ATMSS").then((items)=>{
                   
                });
                database.purge("AUTH").then((items)=>{
                   
                });
                database.purge("FRS").then((items)=>{
                   
                });
                database.purge("NFC").then((items)=>{
                  
                });
                database.purge("OTPS").then((items)=>{
                    
                });
                database.purge("CIS").then((items)=>{
                    
                });
                database.purge("CAS").then((items)=>{
                 
                });
                database.purge("NS").then((items)=>{
                    
                });
                database.purge("REP").then((items)=>{
                    
                });
                res.write('{"Status":"purging all subsystems"}');
                console.log("purged all");

                res.end();
             
        
    });

    app.get('/db',function(req, res)
    {
        if(req.query.system !== undefined && req.query.start !== undefined && req.query.end !== undefined)
        {
            console.log("fetching");
            console.log(req.query.system)
            database.fetch(req.query.system).then((items)=>{
                res.setHeader('content-type', 'application/json');
                    var returnArray = [];
                    for(var i = 0; i < items.length; i++)
                    {
                        if(items[i]["timestamp"] <= req.query.end && items[i]["timestamp"] >= req.query.start)
                        {
                            returnArray.push(items[i]);
                        }
                    }
                    console.log("done2");
                    var s = JSON.stringify(returnArray)
                    console.log("string created2");
                    res.write(s);
                    console.log("sent2");
                    res.end();
                    //console.log("fetched: "+JSON.stringify(fetched, null, 2)+"-end");
                });
                console.log("fetching2");
        }
    });

    app.post('/api', function (req, res) {//where people will post their json to
        res.header("Access-Control-Allow-Origin", "*");
        var system = req.body.system;
        var data = req.body.data;
        console.log("yip "+req.body["system"]);

        if (req.body.system !== undefined && req.body.data !== undefined) 
        {
            console.log("system defined");
            if(system == "ATMSS")//atm simulation
            {
                var jo = JSON.parse(data);
                database.insert("ATMSS",jo);
                var rep = '[{"system":"ATMSS","timestamp":"'+Date.now()+'"}]';
                database.insert("ATMSS",JSON.parse(rep));
                res.write('{"Status":"uploaded to ATM simulation database"}');
            }
            else if(system == "AUTH")//Authentication
            {
                var jo = JSON.parse(data);
                database.insert("AUTH",jo);

                var rep = '[{"system":"AUTH","timestamp":"'+Date.now()+'"}]';
                database.insert("REP",JSON.parse(rep));
                res.write('{"Status":"uploaded to Authentication database"}');
            }
            else if(system == "CRDS")//Card authentication
            {
                var jo = JSON.parse(data);
                database.insert("CRDS",jo);
                var rep = '[{"system":"CRDS","timestamp":"'+Date.now()+'"}]';
                database.insert("REP",JSON.parse(rep));
                res.write('{"Status":"uploaded to Card authentication database"}');
            }
            else if(system == "OTPS")//OTP authentication
            {
                var jo = JSON.parse(data);
                database.insert("OTPS",jo);
                var rep = '[{"system":"OTPS","timestamp":"'+Date.now()+'"}]';
                database.insert("REP",JSON.parse(rep));
                res.write('{"Status":"uploaded to OTP authentication database"}');
            }
            else if(system == "FRS")//Facial recognition
            {
                var jo = JSON.parse(data);
                database.insert("FRS",jo);
                var rep = '[{"system":"FRS","timestamp":"'+Date.now()+'"}]';
                database.insert("REP",JSON.parse(rep));
                res.write('{"Status":"uploaded to Facial recognition database"}');
            }
            else if(system == "CIS")//client information
            {
                var jo = JSON.parse(data);
                database.insert("CIS",jo);
                var rep = '[{"system":"CIS","timestamp":"'+Date.now()+'"}]';
                database.insert("REP",JSON.parse(rep));
                res.write('{"Status":"uploaded to client information database"}');
            }
            else if(system == "CAS")//Client Accounts
            {
                var jo = JSON.parse(data);
                database.insert("CAS",jo);
                var rep = '[{"system":"CAS","timestamp":"'+Date.now()+'"}]';
                database.insert("REP",JSON.parse(rep));
                res.write('{"Status":"uploaded to Client Accounts database"}');
            }
            else if(system == "NS")//Notifications
            {
                var jo = JSON.parse(data);
                database.insert("NS",jo);
                var rep = '[{"system":"NS","timestamp":"'+Date.now()+'"}]';
                database.insert("REP",JSON.parse(rep));
                res.write('{"Status":"uploaded to Notifications database"}');
            }
            else if(system == "REP")//Reportings

            {
                var jo = JSON.parse(data);
                database.insert("REP",jo);
                res.write('{"Status":"uploaded to reporting"}');
                //this is our subsystem
            }
            else
            {
                res.write('{"ERROR":"correct parameters, wrong subsystem"}');
            }
        }
        else
        {
            res.write('{"ERROR":"incorrect parameters, use system and data"}');
        }
        res.end();
    });

    app.listen(process.env.PORT || 3000, function(){ //must be at end of js file
        console.log("Listening on port 4004");
        //process.exit();
    });


//express.on('SIGINT');

//process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });
