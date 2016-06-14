
/*

URL Parameters:
//http://example.com/api/users?id=4&token=sdfa3&geo=u

This is most seen in requesting information from an API

URL Parameters are grabbed using 'req.param.variable_name'


Post Parameters:
   These are information that come from forms.  We'll be grabbing
   from forms that pass information as application/x-www-form-urlencoded

   POST Parameters are grabbed using 'req.body.variable_name'

   Let's take a look at how we can grab the parameters using the
   popular Node.js framework, ExpressJS

*/

/*
Getting Any URL Parameter:
  e.g. URL
    http://example.com/api/users?id=4&token=sdfa3&geo=us

    The parameters that come out of this will be:
    id:  4
    token: sdfa3
    geo: us

  it's very easy to grab these parameters.  Here's the
  route and the method for grabbing paramters is req.param()


*/

//grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

//routes will go here
app.get( '/api/users', function( req, res ) {
  var user_id = req.param('id');
  var token = req.param('token');
  var geo = req.param('geo');

  res.send( user_id + ' ' + token + ' ' + geo );
});

//start the server
app.listen( port );
console.log( 'Server started! At http://localhost:' + port );


//Specific Routing for Specific Parameters
//http://localhost:8080/api/1
app.get( '/api/:version', function( req, res) {
  res.send( req.params.version );
});


//Route Parameter Middleware
/*
We will be using 'param' function to grab a Specific
parameter.  This is considered middleware and will run
before the route is called.

This can be used for validation (like checking if a users
exists) or grabbing important information about that users
or item.
*/

//e.g.

//parameter middleware that will run before the next routes
app.param( 'name', function(req, res, next, name ) {

    //check if the user with that name exists
    //do some validation
    //add -dude to the name
    var modified = name + '-dude';

    //save name to the requesting
    req.name = modified;

    next();
});

//http://localhost:8080/api/users/chris
app.get( '/api/users/:name', function( req, res) {
  //the user was found and is available in req.user
  res.send( 'What is up' + req.name + '!' );
});

//If we visit the URL in our browser we will see
// What is up chris-dude!
//We then save info to the request(req) so that
//our other route will have access to it


/*
POST Parameters:
  To get POST parameters, we'll need wto the ExpressJS
  body-parser package. This will allow us to grab
  information from the POST.

  */

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());//support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true}));//support
  //encoded bodies

//we will grab POST parameters using req.body.variable_name
//POST http://localhost:8080/api/users
//parameters sent with
app.post('/api/users/', function(req, res) {
  var user_id = req.body.id;
  var token = req.body.token;
  var geo = req.body.geo;

  res.send( user_id + ' ' + token + ' ' + geo );
});
