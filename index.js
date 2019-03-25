var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*view egine setup
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

app.get('/', function (req, res) {//front end
    res.sendfile('index.html');
});

app.post('/api', function (req, res) {//where people will post their json to
    var system = req.body.system;
    var data = req.body.data;

    if (req.body.system !== undefined && req.body.data !== undefined) 
    {
        console.log("system defined");
        if(system == "ATMSS")//atm simulation
        {
    
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
        else if(system == "REP")//Reporting
        {
            //this is our subsystem
        }
        else
        {
    
        }
    }
    else
    {
        
    }

   

    console.log(system);
    console.log(data);
    console.log("post check");

    res.end();
});

app.listen(8080, function(){ //must be at end of js file
    console.log("Listening on port 8080!");
});
