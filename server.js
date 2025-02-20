var fs = require('fs'),
    express = require('express'),
    createAllBuildingsSTL = require('./allBuildingsSTL.js').allBuildingsSTL,
    buildSTL = require('./buildSTL.js').buildSTL,
    buildOSM = require('./buildOSM.js').buildOSM,
    bodyParser = require('body-parser');


var app = express();
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/place.html');
});

app.post('/createSTL', function(req, res) {
    console.log(req.body);
    fs.writeFileSync('buildingsM.json', JSON.stringify(req.body));
    buildSTL(req.body.buildings);
});
app.post('/createOSM', function(req, res) {
    console.log(req.body);
    buildOSM(req.body.buildings);
});

app.post('/createOneSTL', function(req, res) {

    res.send("Stl File Created");
});
app.post('/createAllBuildingsSTL', function(req, res) {
    createAllBuildingsSTL(req.body.buildings);
    res.send("Stl File Created");
});

app.listen(8000);
