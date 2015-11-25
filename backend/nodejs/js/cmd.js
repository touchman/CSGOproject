module.exports = {
    serverAccess: function(){

        var execSync = require('sync-exec');

        execSync('cmd /c data\\steam.bat"');

        console.log("cmd thread")


    }
}