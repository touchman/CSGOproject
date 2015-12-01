module.exports = {
    serverAccess: function(){

        var execSync = require('sync-exec');
        console.log("cmd thread")

        execSync('cmd /c data\\steam.bat"');

    }
}