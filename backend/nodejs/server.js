var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/public'))

app.get('/players', function(req,res){
    console.log('players request');

    var jsonfile = require('jsonfile');

    var fileIn = 'data/dataOut.json';

    var players = jsonfile.readFileSync(fileIn);

    res.json(players);
});

app.get('/getstats', function(req, res){
    res.sendFile(path.join(__dirname + '/public/players.html'))
})


app.get('/listen', function(req,res){

    res.sendFile(path.join(__dirname + '/public/listen.html'));

    console.log('i start to listen');

    var dgram = require('dgram'),
        server = dgram.createSocket('udp4');

    server.on('listening', function () {
        var address = server.address();
        console.log('UDP Server listening ' + address.address + ':' + address.port);
    });

    server.bind(1234);

    var jsonfile = require('jsonfile');

    var fileOut = 'data/dataOut.json';

    var util = require('util');

    var fileIn = 'data/dataIn.json';

    var players = jsonfile.readFileSync(fileIn);

    var obj = [
        {
            id: players[0].fullSteamId,
            name: players[0].name,
            kills: 0,
            deaths: 0},
        {
            id: players[1].fullSteamId,
            name: players[1].name,
            kills: 0,
            deaths: 0},
        {
            id: players[2].fullSteamId,
            name: players[2].name,
            kills: 0,
            deaths: 0},
        {
            id: players[3].fullSteamId,
            name: players[3].name,
            kills: 0,
            deaths: 0},
        {
            id: players[4].fullSteamId,
            name: players[4].name,
            kills: 0,
            deaths: 0},
        {
            id: players[5].fullSteamId,
            name: players[5].name,
            kills: 0,
            deaths: 0},
        {
            id: players[6].fullSteamId,
            name: players[6].name,
            kills: 0,
            deaths: 0},
        {
            id: players[7].fullSteamId,
            name: players[7].name,
            kills: 0,
            deaths: 0},
        {
            id: players[8].fullSteamId,
            name: players[8].name,
            kills: 0,
            deaths: 0},
        {
            id: players[9].fullSteamId,
            name: players[9].name,
            kills: 0,
            deaths: 0}
    ];

    server.on('message', function (message, rinfo) {
        var msg = message.toString('ascii').slice(5,-1);
        console.log(msg);
        write(msg)
    });
    /*
     console.log(obj["steamid1"].kills);
     console.log(obj["steamid1"].deaths);
     console.log(Object.keys(obj).length);
     */
    var write = function(testLog){
        var length = Object.keys(obj).length; // == 2

        var index;
        var count = 0;
        for (index = 0; index < length; ++index) {

            var steam = index; // steamid#
            if(count == 2) break;              // we need to count only 2 times (kill and dead) and another circles doesn't matter


            if(testLog.indexOf(obj[steam].id) > -1){

                if(testLog.indexOf("killed") > -1){
                    if(testLog.indexOf("killed") > testLog.indexOf(obj[steam].id)){
                        obj[steam].kills++;
                        count++;
                    } else{
                        obj[steam].deaths++;
                        count++;
                    }
                }
            }

        }

        if(testLog.indexOf("Match_Start") > -1){
            var index2;
            for (index2 = 0; index2 < length; ++index2) {
                var steam2 = index2;
                obj[steam2].kills = 0;
                obj[steam2].deaths = 0;
            }
        }

        console.log(obj);

        jsonfile.writeFile(fileOut, obj, function (err) {
            console.error(err)
        });
    };

});


app.listen(3000);

console.log('Server running on port 3000');