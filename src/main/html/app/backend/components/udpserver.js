module.exports = {
    udpserver: function (req, res, steamID) {

        //res.sendFile(path.join(__dirname + '/public/listen.html'));
        //res.sendFile('listen.html', {root: './public'});

        var dgram = require('dgram'),
            server = dgram.createSocket('udp4');

        var cmd = require('./cmd');
        var mongoose 	= require('mongoose');

        var MatchSchema = require('./models/match');

        var udp;
        server.on('listening', function () {
            var address = server.address();
            udp = address.address + ':' + address.port;
            console.log('UDP Server listening ' + address.address + ':' + address.port);
            res.json({udp: udp})
        });

        server.bind(0);

        var jsonfile = require('jsonfile');

        var fileOut = 'data/dataOut.json';

        var util = require('util');

        var fileIn = 'data/dataIn.json';

        var players;

        var date;

        var dataStr;

        var map;

        var user = steamID;

        var obj = [];

        var isInit = false;

        var init = function () {
            players = jsonfile.readFileSync(fileIn);
            var length = Object.keys(players).length;
            obj = [];
            date = new Date();
            dataStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' at ' +  date.getHours() + ':' + date.getMinutes();
            var index;
            for (index = 0; index < length +1; ++index) {
                if(index < length){
                    obj.push({
                        id: players[index].fullSteamId,
                        name: players[index].name,
                        kills: 0,
                        deaths: 0,
                        hs: 0,
                        team: ""
                    });
                } else
                    obj.push({map : map,
                        date: dataStr,
                        scoreT: 0,
                        scoreCT: 0,
                        firstHalf: ""})
            }
            console.log(obj);
            isInit = true;
        };


        server.on('message', function (message, rinfo) {
            var msg = message.toString('ascii');
            //console.log(msg);
            if (msg.indexOf("Match_Start") > -1) {
                map = msg.substr(msg.indexOf("Match_Start")+17, msg.length - (msg.indexOf("Match_Start")+19));
                cmd.serverAccess(req.body.ip, req.body.port, req.body.rcon);                     // this is for full test
                console.log("start match");
                init();
                write(msg)
            } else {
                //console.log("writing log(during match)");
                write(msg)
            }

        });


        /*
         console.log(obj["steamid1"].kills);
         console.log(obj["steamid1"].deaths);
         console.log(Object.keys(obj).length);
         */

        var isSwitched = true;
        var write = function (testLog) {
            var length = Object.keys(obj).length;

            if(testLog.indexOf('triggered') > -1 && isInit){
                if(testLog.indexOf('Team "CT" triggered "SFUI') > -1){
                    obj[length-1].scoreCT++;
                } else if(testLog.indexOf('Team "TERRORIST" triggered "SFUI') > -1){
                    obj[length-1].scoreT++;
                }
            }


            if(testLog.indexOf('switched') > -1 && isInit && isSwitched){
                obj[length-1].firstHalf = "CT: "+  obj[length-1].scoreCT + " T: " + obj[length-1].scoreT;
                var ct = obj[length-1].scoreCT;
                var t = obj[length-1].scoreT;
                console.log('switched - ' + ct + ' ' + t);
                obj[length-1].scoreCT = t;
                obj[length-1].scoreT = ct;
                isSwitched = false;
            }

            if (testLog.indexOf("killed") > -1) {
                var index;
                var count = 0;
                for (index = 0; index < length-1; ++index) {

                    var steam = index; // steamid#
                    if (count == 2) break;              // we need to count only 2 times (kill and dead) and another circles doesn't matter

                    if (testLog.indexOf(obj[steam].id) > -1) {

                        var countCT = (testLog.match(/<CT>/g) || []).length;
                        var countT = (testLog.match(/<TERRORIST>/g) || []).length;

                        if(obj[steam].team == ""){
                            obj[steam].team = testLog.substr(testLog.indexOf(obj[steam].id) + obj[steam].id.length + 2, 1);
                        }

                        if (testLog.indexOf("killed") > testLog.indexOf(obj[steam].id)) {
                            if (countCT == 1 || countT == 1) {
                                obj[steam].kills++;
                                count++;
                                if(testLog.indexOf("headshot") > -1)
                                    obj[steam].hs++;
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
                for (index2 = 0; index2 < length-1; ++index2) {
                    var steam2 = index2;
                    obj[steam2].kills = 0;
                    obj[steam2].deaths = 0;
                    obj[steam2].hs = 0;
                }
                obj[length-1].scoreCT = 0;
                obj[length-1].scoreT = 0;
                isSwitched = true;
            } else if (testLog.indexOf("suicide") > -1) {
                var i;
                for (i = 0; i < length-1; ++i) {

                    var steam = i; // steamid#
                    if (testLog.indexOf(obj[steam].id) > -1) {
                        obj[steam].kills--;
                        obj[steam].deaths++;
                        return;
                    }
                }
            }

            if(testLog.indexOf('scored "16"') > -1)   {

                var matchModel = new MatchSchema();
                matchModel.steamID = user;
                matchModel.match = obj;
                matchModel.save(function(err, user) {
                    if(err) console.log(err);
                });
                jsonfile.writeFile(fileOut, obj, function (err) {
                    console.error(err)
                })
            }
        };
    }
};