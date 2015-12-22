var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// assuming POST: name=foo&color=red            <-- URL encoding
//
// or       POST: {"name":"foo","color":"red"}  <-- JSON encoding

var log = "Hello!";

app.post('/test-page', function(req, res) {
    
    console.log("Handling POST");
    
    var accelX = req.body.accelX;
    var accelY = req.body.accelY;
    var accelZ = req.body.accelZ;

    var rotationX = req.body.rotationX;
    var rotationY = req.body.rotationY;
    var rotationZ = req.body.rotationZ;

    
    res.send("Registered sensor settings.");
        
    log = log + "accelX: " + accelX + ", accelY: " + accelY + ", accelZ: " + accelZ + "<br/>"
    log = log + "rotationX: " + rotationX + ", rotationY: " + rotationY + ", rotationZ: " + rotationZ + "<br/>"
});

app.get('/', function (req, res) {
  res.send(log);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
