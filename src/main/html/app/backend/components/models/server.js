var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//Schema for 'User' entity in the DB
var ServerSchema = new Schema({
    ip: String,
	port: String,
	rcon: String,
	steamID: String
});

module.exports = mongoose.model('Server', ServerSchema);