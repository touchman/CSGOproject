var dgram = require('dgram');
var message;
var client = dgram.createSocket('udp4');
var exec = require('sync-exec');

var fs = require('fs');

var mas = [];

fs.readFileSync('csgo1.txt').toString().split('\n').forEach(function (line) {
    console.log(line);
    line = new Buffer(line);
    console.log(line);
    mas.push(line)
});

/*var newBuffer = Buffer.concat(mas);
console.log(newBuffer);


console.log(Buffer.byteLength(newBuffer.toString(), 'utf8'))
console.log(newBuffer.length)

client.send(newBuffer, 0, newBuffer.length, 1234, 'localhost', function(err) {
    client.close();
    console.log(err);
});*/

var index;
for(index=0; index < mas.length; ++index){
    (function(index){
        setTimeout(function(){
            client.send(mas[index], 0, mas[index].length, 64249, 'localhost', function(err) {
                console.log(err);
            });
        }, 10 * index);
    }(index));
}
