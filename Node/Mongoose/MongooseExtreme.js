/*
Node and MOngo are a pair made for each other.  Being
Able to use JSON across the board and JavaScript makes development
very easy.

Mongoose is an object modeling package for Node that essentially
works like an ORM that you would see in other languages.

*ORM - is Object-relational Mapping, is a technique for converting
data between incompatible type systems in object-oriented programming
languages.


Defining a Model
Before we can handle CRUD operations, we will need a
mongoose Model

Mongoose Schema - is what is used to define attributed for our
documents

Mongoose Methods - defined on a mongoose schema.  These are Methods


*/
//------------------------------------------------------------
//MONGOOSE
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myappdatabase');

//-------------------------------------------------------------

//SAMPLE MODEL FOR USERS

//grab the packages we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//connect to a MongoDB database (either local or hosted)
mongoose.connect('mongodb://localhost/myappdatabase');

//create a Schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

//the schema is useless so far
//we need to create a model using it
var User = mongoose.model( 'User', userSchema );

//make this available to our users in our node application
module.exports = User;

//-------------------------------------------------------------

//CUSTOM METHOD

var mongoose = requre('mongoose');
var Schema = mongoose.Schema;

//create a schema
var userSchema ...

//custom method to add string to end of name
//you can create more important methods like name validations
//or formatiion, you can aldo do queries and find similar userSchema
userSchema.methods.dufify = function() {
  //add some stuff to the user name
  this.name = this.name + '-dude';

  return this.name;
};

//the schema is useless so far
//we need to create a model using it
var User = mongoose.model( 'User', userSchema );

//make this available to our users in our Node application
module.exports = User;

//SAMPLE USAGE
//now we have a custom model and method that we can call in our code

//if our user.js file is at app/model/user.js
var User = require('./app/models/user');

//create a new user called chris
var chris = new User({
  name: 'Chris',
  username: 'sevilayha',
  password: 'password'
});

//call the custom method.  this will just add -dude to his name
//user will nw be Chris-dude
chris.dudify(function( err, name ){
  if ( err ) throw err;
  console.log( 'Your new name is ' + name );
});

//call the built-in save method to save to the database
chris.save(function(err) {
  if ( err ) throw err;
  console.log( 'User saved successfully!' );
});


//-------------------------------------------------------------

//RUN A FUNCTION BEFORE SAVING
/*
We also want to have a  'created_at' variable to know when the
record was created.  We can use the Schema 'pre' method to have
operations happen before an object is saved
*/

//on every save, add the date
userSchema.pre( 'save', function( next ){
  //get the current Date
  var currentDate = new Date();

  //change the updated_at field to current Date
  this.updated_at = currentDate;

  //if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

    next();
});

/*
Now on every save, we will add our dates.  This is also a great
place to hash paswords to be sure that we never save plaintext
passwords.  We can also deine more things on our models and schemas
like statics and indexs.  Be sure to take alook at the mongoose docs
for more info.
*/


//-------------------------------------------------------------

//CREATE
/*
  We'll be using the 'User' method we created earlier.  The
  built-in 'save' method on mongoose MOdels is waht is used to create
  a user
*/

//grab the user model
var User = require('./app/models/user');

//create a new user
var newUser = User({  //new??? I think so
  name: 'Peter Quill',
  username: 'starlord55',
  password: 'password',
  admin: true
});

//save
newUser.save(function( err ){
  if ( err ) throw err;
  console.log('User created!');
});


//-------------------------------------------------------------

//READ
/*
  There are many reasons for us to query our database of users.
  We'll need one specific user, all users, similar usrs, and many
  more scenarios.
*/

//FIND ALL
//get all the users
User.find({}, function( err, users) {
  if ( err ) throw err;
  //objec of all the users
  console.log( users );
});

//FIND ONE
//get the user starlord55
User.find({ username: 'startlord55' }, function( err, user ) {
  if ( err ) throw err;

  //object of the user
  console.log( user );
});

//FIND BY ID
//get a user with ID of 1
User.findById( 1, function( err, user ) {
  if (err) throw err;
  //show the one user
  console.log( user );
});

//Querying
//you also use MongoDB query syntax

//get any admin that was created in the past month
//get the date 1 month ago
var monthAgo = new Date();
monthAgo.setMonth( monthAgo.getMonth() - 1 );

User.find({ admin: true}).where('created_at').gt( monthAgo ).exec(
  function( err, users ) {
    if ( err ) throw err;
    //show the admins in the past month
    console.log( users );
  });

//-------------------------------------------------------------

//UPDATE
//here we will find a specfic user, change some attributes, and then
//re-save them.

//GET A USER THEN UPDATE

//get a user with ID of 1
User.findById( 1, function( err, user ){
  if ( err ) throw err;
  //change the users location
  user.location = 'uk';

  //save the user
  user.save(function( err ){
    if ( err ) throw err;
    console.log('USer successfully updated!');
  });
});

//Remember that since we created the functoin to change the 'updated_at'
//date, this will also happen on 'save'

//FIND AN UPDATE
//an even easier method to use since we don't have to grab the user,
//modify, and then save.  We are just issuing a mongodb findAndModify
//command

//find the user starlord55
//update him to starlord88
User.findOneAndUpdate({ username: 'startlord55'}, { username:
'startlord88'}, function( err, user){
  if ( err ) throw err;
  //we have the updated user returned to us
  console.log( user );
});

//FIND BY ID AND UPDADTE
//find the user with id 4
//update username to starlord88
User.findIdAndUpdate( 4, { username: 'starlord88' },
function( err, user ){
  if (err) throw err;
  //we have the updated user return to us
  console.log( user );
});


//-------------------------------------------------------------

//DELETE

//GET A USER, THEN REMOVE
//get the user starlord55
User.find({ username: 'starlord55' }, function( err,user){
  if (err) throw err;
  //delete him
  user.remove(function(err){
    if ( err ) throw err;
    console.log('User successfully deleted!');
  });
});

//FIND AND REMOVE
//find the user with id 4
User.findOneAndRemove({ username: 'startlord55'}, function(err){
  if ( err ) throw err;
  //we have delted the user
  console.log('User delted!');
});

//FIND BY ID AND REMOVE
User.findByIdAndRemove( 4, function( err ) {
  if ( err ) throw err;
  //we have delted the user
  console.log( 'User delted!');
})
