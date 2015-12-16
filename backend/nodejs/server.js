var express 	= require('express');
var app 		= express();
var path 		= require('path');
var server 		= require('./js/udpserver');
var reader 		= require('./js/reader');
var cors 		= require('cors');
var bodyParser 	= require('body-parser');
//Authentication dependencies
var jwt 		= require('jsonwebtoken');
var morgan 		= require("morgan");
//Includes 'mongoose' ORM for MongoDB 
var mongoose 	= require('mongoose');
var UserSchema 	= require('./js/models/user');
var MatchSchema = require('./js/models/match');
var ServerSchema = require('./js/models/server');


//Only for testing 
var faker = require('faker');
var JWT_SECRET = "DoublePresso";

app.use(bodyParser(), cors());


//Includes router for the application
var router = express.Router();

//Assuming that the following URL is address of MongoDB
//TODO: should be defined as constant and probably refactored
mongoose.connect('mongodb://localhost:27017/my_database_name');

var user = new UserSchema();


//*********************Authentication REST*********************
router.post('/authenticate', function(req, res) {
		console.log(req.body);
		
	    UserSchema.findOne({name: req.body.name, password: req.body.password}, function(err, user) {
	        if (err) {
	            res.json({
	                type: false,
	                data: "Error occured: " + err
	            });
	        } else {
	            if (user) {
	            	//There could be check whether token is expired or not
	            	if (!user.token)
	            		user.token = jwt.sign(user, JWT_SECRET);
	            	
	                user.save(function(err, user1) {
	                    res.json({
	                        type: true,
	                        data: user1.steamID,
	                        token: user1.token
	                    });
	                }); 
	            } else {
	                res.json({
	                    type: false,
	                    data: "Incorrect email/password"
	                });    
	            }
	        }
	    });
});

router.post('/signin', function(req, res) {
		UserSchema.findOne({steamID: req.body.steamID}, function(err, user) {
			if (err) {
					res.json({
						type: false,
						data: "Error occured: " + err
					});
				} else {
					if (user) {
						console.log('Request is ', req.headers);
						res.json({
							type: false,
							data: "User already exists!"
						});
					} else {
						console.log('Req body is', req.body);
						var userModel = new UserSchema();
						userModel.steamID = req.body.steamID;
						userModel.name = req.body.name;
						userModel.password = req.body.password;
						userModel.save(function(err, user) {
							console.log(user);
							res.json({type: true});
						})
					}
				}	
	  })
});

router.get('/me', ensureAuthorized)


function getToken(requestHeaders) {
	var bearerToken;
	var bearerHeader = requestHeaders["authorization"];
	if (typeof bearerHeader !== 'undefined') {
		var bearer = bearerHeader.split(" ");
		bearerToken = bearer[1];

		return bearerToken;
	}
}

router.get('/matches', function(req, res) {
			var token = getToken(req.headers);

			var currUser = jwt.decode(token, JWT_SECRET);

			MatchSchema.find({steamID: currUser.steamID}, function(err, matches) {
				console.log(currUser);
			if (err) {
				res.json({
					type: false,
					data: "Error occured: " + err
				});
			} else {
				var data = {};
				matches.forEach(function (match) {
						data[match._id] = match;
					console.log(match);
				});

				//console.log(data);
				res.json({
					type: true,
					data: data
				});
			}
		});
});

function ensureAuthorized(req, res) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];    
        
        var user = jwt.decode(bearerToken, JWT_SECRET);
        console.log('obtained user', user);
        
        UserSchema.findOne(user, function(err, user) {
        	if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                res.json({
                    type: true,
                    data: user
                });
            }
        });
        
        console.log('Success, loged in');
    } else {
        res.sendStatus(403);
    }
}

//*********************MongoDB REST*********************

//Sets routes
router.use(function(req, res, next) {
	console.log('Middleware');
	
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'MongoDB REST'});
});

//Gets a user by the name
router.get('/users/:user_name', function(req, res) {
		  console.log(req.params.user_name);
			UserSchema.find({name : req.params.user_name}, function(err, user) {
            if (err)
                res.send(err);
			
            res.json(user);
        });	  
});

/*router.route('/user')
	.get(function(req, res) {
		var user = faker.helpers.userCard();
		user.avatar = faker.image.avatar();
		
		res.json(user);  
});*/

//Creates a user by post
router.post('/users', function(req, res) {
		  
		  var user = new UserSchema();  
		  user.name = req.body.name;
		  user.password = req.body.password;
		  user.save(function(err) {
			 if (err)
					res.send(err);
				
				res.json({ message: 'User created!' });
		  });
		  
});

//*********************File REST*********************

//app.use(express.static(__dirname + '/public'))
/*router.route('/user')
.get(function(req, res) {
	var user = faker.helpers.userCard();
	user.avatar = faker.image.avatar();
	
	res.json(user);  
});*/

router.get('/players', function(req, res) {
    console.log('players request');
    reader.readfile(req, res);
});

router.get('/stats', function(req, res) {
		  res.json({data: 'There should be statistics'});
});

router.post('/server', function(req, res) {
	console.log(req.body);

	var token = getToken(req.headers);

	var currUser = jwt.decode(token, JWT_SECRET);

	ServerSchema.findOne({ip: req.body.ip, port: req.body.port, rcon: req.body.rcon}, function(err, user) {
		if (err) {
			console.log(err)
		} else {
			if (user) {
				//There could be check whether token is expired or not
				console.log("server already exists")
			} else {
				var serverModel = new ServerSchema();
				serverModel.ip = req.body.ip;
				serverModel.port = req.body.port;
				serverModel.rcon = req.body.rcon;
				serverModel.steamID = currUser.steamID;
				serverModel.save(function(err) {
					if(err) console.log(err);
				});
			}
		}
	});

	//server.udpserver(req, res, ip, port, rcon)
});

router.post('/start', function(req, res){

	console.log(req.body);

	var token = getToken(req.headers);

	var currUser = jwt.decode(token, JWT_SECRET);

	server.udpserver(req, res, currUser.steamID);
});



router.get('/servers', function(req, res) {
	var token = getToken(req.headers);

	var currUser = jwt.decode(token, JWT_SECRET);

	ServerSchema.find({steamID: currUser.steamID}, function(err, servers) {
		if (err) {
			res.json({
				type: false,
				data: "Error occured: " + err
			});
		} else {
			var data = {};
			servers.forEach(function (server) {
				data[server._id] = server;
				console.log(server);
			});

			//console.log(data);
			res.json({
				type: true,
				data: data
			});
		}
	});
});

router.delete('/server/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	ServerSchema.remove({_id: mongoose.Types.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
});

router.get('/match/:id', function (req, res) {
	console.log('match request');
	console.log(req.params.id);

	MatchSchema.find({_id: mongoose.Types.ObjectId(req.params.id)},function (err, dock) {
			console.log(dock);
			res.json(dock)
		}
	)
});

router.delete('/matches/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	MatchSchema.remove({_id: mongoose.Types.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
});
/*

router.get('/matches/', function (req, res) {
	console.log('matches request');
	MatchSchema.find({user: req.data},function (err, dock) {
			console.log(dock);
			res.json(dock)
		}
	)
});


*/


//Registers routes to application
app.use('/api', router);

app.listen(3000);

console.log('Server running on port 3000');