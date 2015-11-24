module.exports = {
    readfile: function(req, res){

        var jsonfile = require('jsonfile');

        var fileIn = './data/dataOut.json';

        var players = jsonfile.readFileSync(fileIn);

        res.json(players);
    }
};