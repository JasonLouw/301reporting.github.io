//nodemon to automatically restart server on changes
var express = require('express');
//var mongo = require('mongodb').MongoClient;
var cors = require('cors');
var $ = require('jquery');
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
        console.log("here");
        res.sendfile('/index.html');
    });

    app.post('/api', function (req, res) {//where people will post their json to
        res.header("Access-Control-Allow-Origin", "*");
        var system = req.body.system;
        var data = req.body.data;
        console.log(data);

        if (req.body.system !== undefined && req.body.data !== undefined)
        {
            console.log("system defined");
            if(system == "ATMSS")//atm simulation
            {
                var jo = JSON.parse(data);
                database.insert("ATMSS",jo);
                var fetched;

                database.fetch("ATMSS").then((items)=>{
                    fetched = items;
                    console.log("fetched: "+JSON.stringify(fetched, null, 2)+"-end");
                });
            }
            else if(system == "AUTH")//Authentication
            {

            }
            else if(system == "CRDS")//Card authentication
            {

            }
            else if(system == "OTPS")//OTP authentication
            {

            }
            else if(system == "FRS")//Facial recognition
            {

            }
            else if(system == "CIS")//client information
            {

            }
            else if(system == "CAS")//Client Accounts
            {

            }
            else if(system == "NS")//Notifications
            {

            }
            else if(system == "REP")//Reportings

            {
                //this is our subsystem
            }
            else
            {
                res.write('{"ERROR":"correct parameters, wrong subsysetm"}')
            }
        }
        else
        {
            res.write('{"ERROR":"correct parameters or Not url encoded"}')
        }
        res.end();
    });

    app.listen(process.env.PORT || 4004, function(){ //must be at end of js file
        console.log("Listening on port 4004");
        //process.exit();
    });


//express.on('SIGINT');

//process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });
