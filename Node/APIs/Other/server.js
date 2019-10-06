/*
  Application
We are going to build an API that will:
  * Handle CRUD for an item (we're going to use bears)
  * Have a standart URL (http://exaple.com/api/bears and http://
example.com/api/bears/:bear_id)
  *Use the propert HTTP verbs to make it RESTful (GET, POST, PUT, DELETE)
  *Return JSON data
  *Log all requests to the console.
*/

//BASE SETUP
//==================================================

//call the packages we need
var express = require('express'); //call express
var app = express(); //define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bearDB');

var Bear = require('./app/models/bear'); //Bear Model
//configure app to use bodyParser()
//this will let us get the data from a POST
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

var port = process.env.PORT || 8080; //set our port

//ROUTES FOR OUR API
//===========================================================
var router = express.Router(); //get an instance of the express router


//middleware to use for all requests
// router.use( function( req, res, next ) {
//   //do loggin
//   console.log('Something is happening.');
//   next(); //make sure we go to the next routes and don't stop here
// });
/*
Using middleware like the above is very powerful.  We can do
validations to make sure that everything coming from a request
is safe and sound.  We can throw errors here in case Something
is wrong.  We can do some extra logging for analytics or any statistics
we'd like to keep.  There are many possibilities here.
*/

//test route to make sure everything is working (accessed at GET
//http://localhost:8080/api)
router.get('/', function( req, res ) {
  res.json({ message: 'horray! welcome to our api!' });
});

//more routes for our API will happen here

/*
  EXPRESS ROUTER AND ROUTES

  Route:              HTTP Verb:    Description:
  /api/bears          GET           Get all the bears
  /api/bears          POST          Create a bear
  /api/bears/:bear_id GET           Get a single bear
  /api/bears/:bear_id PUT           Update a bear with new info
  /api/bears/:bear_id DELETE        Delete a bear

*/

//ROUTES FOR OUR API
//=============================================================

//more routes for our API will happen here

//on routes that end in /bears
//-------------------------------------------------------
router.route('/bears')//handle multiple routes for same URI

      //create a bear (accessed at POST http://localhost:8080/api/bears)
      .post(function( req, res ) {
        var bear = new Bear(); //create a new instance of Bear Model
        bear.name = req.body.name; //set the bears name (comes from request)

        //save the bear and check for errors
        bear.save(function( err ) {
          if( err ) res.send( err );
          res.json({ message: 'Bear created! ' });//res from server to client(browser)
        });
      })

      //get all the bears (accessed at GET http://localhost:8080/api/bears)
      .get(function( req, res ) {
        Bear.find(function( err, bears ) {
          if ( err ) res.send( err );
          res.json( bears );
        });
      });

//CREATING ROUTES FOR A SINGLE item
//lets handle routes for when we pass in a parameter like a bears id

/*
in /bears/:bear_id will be
  *Get a single bear
  *Update a bears info
  *Delete a bear
*/

//on routes that end in /bears/:bear_id
//----------------------------------------------------
router.route('/bears/:bear_id')

    //get the bear with that id (accessed at GET  http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
      Bear.findById( req.params.bear_id, function( err, bear) {
        if ( err ) res.send( err );
        res.json( bear );
      });
    })

    //update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function( req, res ) {

      //user our bear model to find the bear we want
      Bear.findById( req.params.bear_id, function( err, bear ) {
        if ( err ) res.send( err );
        bear.name = req.body.name; //update the bears info

        //save the bear
        bear.save(function( err ) {
          if ( err ) res.send( err );
          res.json({ message: 'Bear Updated!' });
        });
      });
    })

    //delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function( req, res ) {
      Bear.remove({
        _id: req.params.bear_id
      }, function( err, bear ) {
        if ( err ) res.send( err );
        res.json({ message: 'Successfully deleted' });
      });
    });

//REGISTER OUR ROUTES ------------------
//all of our routes will be prefixed with /api
app.use('/api', router);

//START THE SERVER
//=======================================================
app.listen( port );
console.log( 'Magic happens on port ' + port );
