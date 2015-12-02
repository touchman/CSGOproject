var express = require('express');
var app = express();
var path = require('path');
var server = require('./js/udpserver');
var reader = require('./js/reader');
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var db2 = mongojs('matches', ['matches']);

app.use(express.static(__dirname + '/public'));

app.get('/players', function (req, res) {
    console.log('players request');
    reader.readfile(req, res);
});

app.get('/matches/:id', function (req, res) {
    console.log('matches request');
    db2.matches.find({user: req.params.id},function (err, dock) {
            console.log(dock);
            res.json(dock)
        }
    )
});

app.get('/match/:id', function (req, res) {
    console.log('match request');
    db2.matches.find({_id: mongojs.ObjectId(req.params.id)},function (err, dock) {
            console.log(dock);
            res.json(dock)
        }
    )
});

app.delete('/matches/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db2.matches.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    })
});

app.get('/getstats', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/players.html'))
});

app.get('/listen', function (req, res) {
    console.log("getting steam id");

    server.udpserver(req, res, path);

    console.log("listening for logs from server");
});

app.listen(3000);

console.log('Server running on port 3000');