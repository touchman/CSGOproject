module.exports = {
    serverAccess: function(){

        var execSync = require('sync-exec');
        console.log("cmd thread");

        execSync('cmd /c java -jar data/steamMaster.jar pracc123 144.76.18.36 20000');

    }
}