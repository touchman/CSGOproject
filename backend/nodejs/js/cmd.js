module.exports = {
    serverAccess: function(){
        var child = require('child_process');

        child.exec('cmd /c data\\steam.bat"', function(){
            console.log("cmd thread")
        });
    }
}