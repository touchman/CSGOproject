var dgram = require('dgram'),
    server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening ' + address.address + ':' + address.port);
});

server.bind(1234);

var jsonfile = require('jsonfile');

var fileOut = './dataOut.json';

var util = require('util');

var fileIn = './dataIn.json';

var players = jsonfile.readFileSync(fileIn);


var obj = {
    steamid1:{
        id: players[0].fullSteamId,
        kills: 0,
        deaths: 0},
    steamid2:{
        id: players[1].fullSteamId,
        kills: 0,
        deaths: 0},
    steamid3:{
        id: players[2].fullSteamId,
        kills: 0,
        deaths: 0},
    steamid4:{
        id: players[3].fullSteamId,
        kills: 0,
        deaths: 0},
    steamid5:{
        id: players[4].fullSteamId,
        kills: 0,
        deaths: 0},
    steamid6:{
        id: players[5].fullSteamId,
        kills: 0,
        deaths: 0},
    steamid7:{
        id: players[6].fullSteamId,
        kills: 0,
        deaths: 0},
    steamid8:{
        id: players[7].fullSteamId,
        kills: 0,
        deaths: 0},
    steamid9:{
        id: players[8].fullSteamId,
        kills: 0,
        deaths: 0},
    steamid10:{
        id: players[9].fullSteamId,
        kills: 0,
        deaths: 0}
};


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

        var steam = "steamid" + (index+1); // steamid#
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
            var steam2 = "steamid" + (index2+1);
            obj[steam2].kills = 0;
            obj[steam2].deaths = 0;
        }
    }

    console.log(obj);

    jsonfile.writeFile(fileOut, obj, function (err) {
        console.error(err)
    });
};
