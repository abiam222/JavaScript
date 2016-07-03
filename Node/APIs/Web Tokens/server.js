/*
express - the popular Node framework
mongoose - is how we interact with our MongoDB database
morgan - will log requests to the console so we can see what is happening
body-parser - will let us get parameters from our POST requests
jsonwebtoken - is how we create and verify our JSON Web Tokens
*/

/*
WE WILL
Grab All the packages
Configure Our Applications
Create Basic Routes
Create API Routes
*/

//get packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./models/user');


//configurations
var port = process.env.PORT || 8080;
//mongose.connect(config.database);
mongoose.connect('mongodb://localhost/tokens');
app.set('superSecret', config.secret); //secret variable

//use body parser so we can get info from POST and/or URL parameters
app.use( bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );

//use morgan to log requetsts to the console
app.use( morgan('dev') );

//basic Routes
app.get('/', function( req, res ){
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/setup', function( req, res ){
  //create a sample user
  var nick = new User({
    name: 'Nick Cerminara',
    password: 'password',
    admin: true
  });

  //save the sample user
  nick.save( function( err ){
    if ( err ) throw err;
    console.log( 'User saved successfully' );
    res.json({ success: true });
  })
})

//API ROUTES


/*
Let's make our POST localhost /api/authenticate route where we
will accept a name and a password (probably from a form). If the name
and password validate, then we will create a token and pass that back

Once the user has that token, they will store it client side and pass
it with every request for informatoin after that and we will validated
the token on every requets using route middleware

*/

//get an instance of the router for api routes
var apiRoutes = express.Router();

//TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)
//route to autneticate a user POST
apiRoutes.post('/authenticate', function( req, res ){
  //find the user
  User.findOne({
    name: req.body.name
  }, function( err, user ){
    if ( err ) throw err;

    if ( !user ) {
      res.json({ success: false, message: 'Authentication failed. User not found' });
    } else if ( user ) {
      //check if password matches
      if ( user.password != req.body.password ) {
        res.json({ success: false, message: 'Authentication failed. Wrong password' });
      } else {
        //uif user is found and password is right
        //create a token
        var token = jwt.sign(user, app.get('superSecret'), {
        //  expiresInMinutes: 1440 //expires in 24 hours (depricated)
           expiresIn: 1440
        });

        //return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  })
})


//TODO: route middleware to verify a token
//

//route middleware to verify a token
apiRoutes.use( function( req, res, next ){
  //check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //decode token
  if ( token ) {
    //verifies secret and checks exp
    jwt.verify( token, app.get('superSecret'), function( err, decoded ){
      if ( err ) {
        return res.json({ success: false, message: 'Fauled to authenticate token.'});
      } else {
        //if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    //if there is no token
    //return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

//route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function( req, res ){
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

//route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function( req, res ){
  User.find({}, function( err, users ){
    res.json( users );
  });
});

//apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);


//start the server
app.listen(port);
console.log( 'Magic happens at http://localhost:' + port );
