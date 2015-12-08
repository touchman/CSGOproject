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
router.route('/authenticate') 
	.post(function(req, res) {
		console.log(req.body);
		
	    UserSchema.findOne({name: req.body.name, password: req.body.password}, function(err, user) {
	        if (err) {
	            res.json({
	                type: false,
	                data: "Error occured: " + err
	            });
	        } else {
	            if (user) {
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

router.route('/signin')
	  .post(function(req, res) {
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

router.get('/me', ensureAuthorized, function(req, res) {
	UserSchema.findOne({token: req.token}, function(err, user) {
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
});

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
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

router.route('/users/:user_name')
	  //Gets a user by the name
	  .get(function(req, res) {
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

//*********************File REST*********************

//app.use(express.static(__dirname + '/public'))
/*router.route('/user')
.get(function(req, res) {
	var user = faker.helpers.userCard();
	user.avatar = faker.image.avatar();
	
	res.json(user);  
});*/

router.route('/players')
	.get(function(req, res) {
    console.log('players request');
    reader.readfile(req, res);
});

router.route('/stats')
	  .get(function(req, res) {
		  res.json({data: 'There should be statistics'});
});

router.route('/listen')
	  .get(function(req, res) {
		  server.udpserver(req, res, path)
});


//Registers routes to application
app.use('/api', router);

app.listen(3000);

console.log('Server running on port 3000');