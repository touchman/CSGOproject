var express = require('express');
var app = express();
var path = require('path');
var server = require('./js/udpserver');
var reader = require('./js/reader');

//Requires parser for parsing request
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

//Includes 'mongoose' ORM for MongoDB 
var mongoose = require('mongoose');
var UserSchema = require('./js/models/user');

//Includes router for the application
var router = express.Router();

//Assuming that the following URL is address of MongoDB
//TODO: should be defined as constant and possibly refactored
mongoose.connect('mongodb://localhost:27017/my_database_name');

var user = new UserSchema();

//*********************MongoDB REST*********************

//Sets routes
router.use(function(req, res, next) {
	console.log('Mongo REST');
	
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'MongoDB REST'});
});

router.route('/users')
	  //Creates a user by post
	  .post(function(req, res) {
		  
		  var user = new UserSchema();  
		  user.name = req.body.name;
		  user.password = req.body.password;
		  
		  user.save(function(err) {
			 if (err)
					res.send(err);
				
				res.json({ message: 'User created!' });
		  });
		  
});

//Registers routes to application
app.use('/api', router);


//******************************************************

app.use(express.static(__dirname + '/public'))

app.get('/players', function(req,res){
    console.log('players request');
    reader.readfile(req, res);
});

app.get('/getstats', function(req, res){
    res.sendFile(path.join(__dirname + '/public/players.html'))
})

app.get('/listen', function(req,res){
    server.udpserver(req, res, path)
});



app.listen(3000);

console.log('Server running on port 3000');