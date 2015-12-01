var dgram = require('dgram'),
    server = dgram.createSocket('udp4');

var cmd = require('../js/cmd');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening ' + address.address + ':' + address.port);
});

server.bind(1234);

var jsonfile = require('jsonfile');

var fileOut = 'data/dataOut.json';

var util = require('util');

var fileIn = 'data/dataIn.json';

var players;

var obj = [];

var init = function () {
    players = jsonfile.readFileSync(fileIn);
    var length = Object.keys(players).length;
    obj = [];
    var index;
    for (index = 0; index < length; ++index) {
        obj.push({
            id: players[index].fullSteamId,
            name: players[index].name,
            kills: 0,
            deaths: 0
        });
    }
};

server.on('message', function (message, rinfo) {
    var msg = message.toString('ascii');
    console.log(msg);
    if (msg.indexOf("Match_Start") > -1) {
        cmd.serverAccess();                     // this is for full test
        console.log("start match");
        init();
        console.log("writing log(match start)");
        write(msg)
    } else {
        console.log("writing log(during match)");
        //init();                    // for testing with full dataIn file
        write(msg)
    }

});
/*
 console.log(obj["steamid1"].kills);
 console.log(obj["steamid1"].deaths);
 console.log(Object.keys(obj).length);
 */
var write = function (testLog) {
    var length = Object.keys(obj).length; // == 2

    if (testLog.indexOf("killed") > -1) {
        var index;
        var count = 0;
        for (index = 0; index < length; ++index) {

            var steam = index; // steamid#
            if (count == 2) break;              // we need to count only 2 times (kill and dead) and another circles doesn't matter

            if (testLog.indexOf(obj[steam].id) > -1) {

                var countCT = (testLog.match(/<CT>/g) || []).length;
                var countT = (testLog.match(/<TERRORIST>/g) || []).length;

                if (testLog.indexOf("killed") > testLog.indexOf(obj[steam].id)) {
                    if (countCT == 1 || countT == 1) {
                        obj[steam].kills++;
                        count++;
                    }
                    if (countCT == 2 || countT == 2) {
                        obj[steam].kills--;
                        count++;
                    }
                } else {
                    obj[steam].deaths++;
                    count++;
                }
            }
        }
    } else if (testLog.indexOf("Match_Start") > -1) {
            var index2;
            for (index2 = 0; index2 < length; ++index2) {
                var steam2 = index2;
                obj[steam2].kills = 0;
                obj[steam2].deaths = 0;
            }
        } else if (testLog.indexOf("suicide") > -1) {
        var i;
        for (i = 0; i < length; ++i) {

            var steam = i; // steamid#
            if (testLog.indexOf(obj[steam].id) > -1) {
                obj[steam].kills--;
                obj[steam].deaths++;
                return;
            }
        }
    }

    //console.log(obj);

    if (testLog.indexOf('scored "16"') > -1)           // write dataOut file only if match end
        jsonfile.writeFile(fileOut, obj, function (err) {
            console.error(err)
        });
};