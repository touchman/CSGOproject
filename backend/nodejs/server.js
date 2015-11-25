var express = require('express');
var app = express();
var path = require('path');
var server = require('./js/udpserver');
var reader = require('./js/reader');

app.use(express.static(__dirname + '/public'));

app.get('/players', function(req,res){
    console.log('players request');
    reader.readfile(req, res);
});

app.get('/getstats', function(req, res){
    res.sendFile(path.join(__dirname + '/public/players.html'))
})


app.get('/listen', function(req,res){
    console.log("getting steam id");
    //cmd.serverAccess();

    server.udpserver(req, res, path);

    console.log("listening for logs from server");
});

app.listen(3000);

console.log('Server running on port 3000');