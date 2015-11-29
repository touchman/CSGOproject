var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//Schema for 'User' entity in the DB
var UserSchema   = new Schema({
    name: String,
	password: String
});

module.exports = mongoose.model('User', UserSchema);