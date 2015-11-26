module.exports = {
    udpserver: function (req, res, path) {

        //res.sendFile(path.join(__dirname + '/public/listen.html'));

        res.sendFile('listen.html', {root: './public'});

        var cmd = require('./cmd');

        console.log('udp start thread');

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

        var players;

        var obj = [];

        var init = function () {
            players = jsonfile.readFileSync(fileIn);
            var length = Object.keys(players).length;

            var index;
            for (index = 0; index < length; ++index) {
                obj.push({
                    id: players[index].fullSteamId,
                    name: players[index].name,
                    kills: 0,
                    deaths: 0
                })
            }
        };

        server.on('message', function (message, rinfo) {
            var msg = message.toString('ascii').slice(5, -1);
            console.log(msg);
            if (msg.indexOf("Match_Start") > -1) {
                cmd.serverAccess();
                console.log("start match");
                init();
                console.log("writing log(match start)");
                write(msg)

            } else {
                if(obj.length == 0)
                init();
                console.log("writing log(during match)");
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

            var index;
            var count = 0;
            for (index = 0; index < length; ++index) {

                var steam = index; // steamid#
                if (count == 2) break;              // we need to count only 2 times (kill and dead) and another circles doesn't matter


                if (testLog.indexOf(obj[steam].id) > -1) {

                    if (testLog.indexOf("killed") > -1) {
                        if (testLog.indexOf("killed") > testLog.indexOf(obj[steam].id)) {
                            obj[steam].kills++;
                            count++;
                        } else {
                            obj[steam].deaths++;
                            count++;
                        }
                    }
                }

            }

            if (testLog.indexOf("Match_Start") > -1) {
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
    }
};