var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//Schema for 'Match' entity in the DB
var MatchSchema = new Schema({
    steamID: String,
    //Match contains all the information about a certain match
    match: Object
});

module.exports = mongoose.model('Match', MatchSchema);