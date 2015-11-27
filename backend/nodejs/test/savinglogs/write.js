var dgram = require('dgram');
    server = dgram.createSocket('udp4');
var exec = require('sync-exec');

var fs = require('fs');

var fileName = 'test.txt';

fs.writeFile(fileName, new Date().toDateString() + '\n', 'utf8', function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening ' + address.address + ':' + address.port);
});

server.bind(1234, function() {
    server.addMembership('224.0.0.114');
});

server.on('message', function (message, rinfo) {
    var msg = message.toString('ascii');
    console.log(msg);
    fs.appendFileSync(fileName, msg + "\n");
});