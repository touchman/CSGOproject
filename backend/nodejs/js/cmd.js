module.exports = {
    serverAccess: function(ip, port, rcon){

        var execSync = require('sync-exec');
        console.log("cmd thread");

        execSync('cmd /c java -jar data/steamMaster.jar ' + rcon + ' ' + ip + ' ' + port);

        console.log("cmd done");
    }
};